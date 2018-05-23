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


const port = process.env.PORT || 5000;

let web3
let web3Provider
let app
let owner
let tokenA
let tokenB
let tokenOracle


async function init() {
  app = express()
  app.use(bodyParser.urlencoded({extended: true}));
  web3Provider = new Web3.providers.HttpProvider('http://localhost:9545/')
  web3 = new Web3(web3Provider)
  let accounts = await web3.eth.getAccounts()
  owner = accounts[0]
  
  tokenA = await getContractInstance(contractA, web3.currentProvider)
  tokenB = await getContractInstance(contractB, web3.currentProvider)
  tokenOracle = await getContractInstance(tokenOracleContract, web3.currentProvider)

    // MongoClient.connect(db.url, (err, database) => {
    // if (err) return console.log(err);
    // let db = database.db("david-dev");
    // require('./app/routes')(app, db);

    // app.listen(port, () => {
    //     console.log(`listening on port ${port}`);
    // })
    // })
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
}



init()

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/token', (req, res) => {
    res.send({ "owner": owner })
})

app.get('/token/:type/:amount/:address', async (req, res) => {
    const type = req.params.type
    const amount = req.params.amount
    const address = req.params.address
    let token = (type == "A") ? tokenA : tokenB
    let transaction = await token.create(address, amount, {from : owner})
    res.send({ "transaction hash": transaction })
    
})

app.get('/balance/:type/:address', async (req, res) => {
    const type = req.params.type
    const address = req.params.address
    let token = (type == "A") ? tokenA : tokenB
    let amount = await token.balanceOf(address)
    res.send({"amount" : amount})
})


