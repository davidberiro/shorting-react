require('dotenv').config()
import express from 'express'
import bodyParser from 'body-parser'
import getAllContracts from './app/web3/contracts'
import mongoose from 'mongoose'

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
  mongoose.Promise = Promise;

  mongoose.connect(process.env.MONGO_URI, () => {
    console.log('connected to database')
    require('./app/routes')(app, contracts)
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    })
  })
}

init().then(() => {
  mongoose.connection.on('error', () => {
    throw new Error('Unable to connect to database')
  })
})

// this needs to be here in order to accept requests made locally
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/shortingaddress', async (req, res) => {
    res.send({ "address" : shorting.address })
})