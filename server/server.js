const express = require('express');
const bodyParser= require('body-parser');
const db = require('./config/db');
var MongoClient = require('mongodb').MongoClient
var fs = require('fs');
import TruffleContract from 'truffle-contract'
import Web3 from 'web3'

import getContractInstance from './helpers/getContract'

const contractA = require('../build/contracts/TokenA.json')
const contractB = require('../build/contracts/TokenB.json')
const tokenOracleContract = require('../build/contracts/TokenOracle.json')
const kyberExchangeContract = require('../build/contracts/KyberNetwork.json')
const shortingContract = require('../build/contracts/Shorting.json')

const DECIMALS = parseFloat(Math.pow(10, 18))
const GAS_LIMIT = 3000000;
const port = process.env.PORT || 5000;

let web3
let web3Provider
let app
let owner
let tokenA
let tokenB
let tokenOracle
let kyberExchange
let shorting
let ownerMsg
let dbo


async function init() {
  app = express()
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  web3Provider = new Web3.providers.HttpProvider('http://localhost:9545/')
  web3 = new Web3(web3Provider)
  let accounts = await web3.eth.getAccounts()
  owner = accounts[0]
  ownerMsg = { from: owner, gas: GAS_LIMIT }
  
  tokenA = await getContractInstance(contractA, web3.currentProvider)
  tokenB = await getContractInstance(contractB, web3.currentProvider)
  tokenOracle = await getContractInstance(tokenOracleContract, web3.currentProvider)
  kyberExchange = await getContractInstance(kyberExchangeContract, web3.currentProvider)
  shorting = await getContractInstance(shortingContract, web3.currentProvider)
  await tokenOracle.setRate(tokenB.address, DECIMALS, ownerMsg)
  // giving 10000 tokens to kyber exchange
  await tokenA.create(kyberExchange.address, 10000*DECIMALS, ownerMsg)
  await tokenB.create(kyberExchange.address, 10000*DECIMALS, ownerMsg)

  MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err);
    dbo = database.db("david-dev");
    // require('./app/routes')(app, dbo);

    app.listen(port, () => {
        console.log(`listening on port ${port}`);
    })
  })
}



init()

// this needs to be here in order to accept requests made locally
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// send tokens to address
app.get('/token/:type/:amount/:address', async (req, res) => {
    const type = req.params.type
    const amount = req.params.amount
    const address = req.params.address
    let token = (type == "A") ? tokenA : tokenB
    let transaction = await token.create(address, amount, {from : owner})
    res.send({ "transaction": transaction })
    
})

// send token balance of token type to address
app.get('/balance/:type/:address', async (req, res) => {
    const type = req.params.type
    const address = req.params.address
    let token = (type == "A") ? tokenA : tokenB
    let amount = await token.balanceOf(address)
    res.send({"amount" : amount})
})

// set the price of 1 token A to be worth {rate} token {type} (e.g 1 token a is 2 token b)
app.get('/setprice/:tokentype/:rate', async (req, res) => {
    const type = req.params.tokentype
    // in case we add another token type? otherwise since A is base token only can change B
    let token = type == 'B' ? tokenB : tokenB
    let rate = req.params.rate
    let response = await tokenOracle.setRate(token.address, rate, ownerMsg)
    res.send({ "receipt" : response })
})

app.get('/getprice/:tokentype', async (req, res) => {
    let token = req.params.tokentype == 'B' ? tokenB : tokenA
    let response = await tokenOracle.convert(tokenA.address, token.address, Math.pow(10,18), ownerMsg)/parseFloat(Math.pow(10,18))
    res.send({ "rate" : response})
})


app.get('/shortingaddress', async (req, res) => {
    res.send({ "address" : shorting.address })
})

app.post('/allowance', async (req, res) => {
    await dbo.collection('allowance').update({address: req.body.address}, req.body, {upsert:true})
    // I think a response needs to be sent in order for the await to work? otherwise need to refresh
    // to update, not 100% sure whats going on
    res.send({ test: 'test' })
});

app.get('/allowance/:address', async (req, res) => {
    let query = { address: req.params.address }
    dbo.collection('allowance').find(query).toArray((err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            console.log('no entry')
            res.send({ tokenA: 0, tokenB: 0 })
        } else {
            console.log(result)
            res.send(result[0])
        }   
    })
    
});



