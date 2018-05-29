require('dotenv').config()
const express = require('express');
const bodyParser= require('body-parser');
var MongoClient = require('mongodb').MongoClient
import getAllContracts from './app/web3/contracts'

const port = process.env.PORT || 5000;

let app
let dbo
let contracts
let shorting

async function init() {
  app = express()
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  
  contracts = await getAllContracts()
  //remove this line when creating shorting routes? 
  shorting = contracts.shorting

  MongoClient.connect(process.env.MONGO_URL, (err, database) => {
    if (err) return console.log(err);
    dbo = database.db("david-dev");
    dbo.collection('allowance').remove({});
    require('./app/routes')(app, dbo, contracts);
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

  app.get('/shortingaddress', async (req, res) => {
      res.send({ "address" : shorting.address })
  })