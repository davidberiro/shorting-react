import TruffleContract from 'truffle-contract'
import Web3 from 'web3'
import getContractInstance from './getContract'

const contractA = require('../../../build/contracts/TokenA.json')
const contractB = require('../../../build/contracts/TokenB.json')
const tokenOracleContract = require('../../../build/contracts/TokenOracle.json')
const kyberExchangeContract = require('../../../build/contracts/KyberNetwork.json')
const shortingContract = require('../../../build/contracts/Shorting.json')

const GAS_LIMIT = 3000000;
const DECIMALS = parseFloat(Math.pow(10, 18))

let web3
let web3Provider
let owner
let tokenA
let tokenB
let tokenOracle
let kyberExchange
let shorting
let ownerMsg
let contracts

async function getAllContracts() {
  
  if (contracts) return contracts
  
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
  
  // not so sure about this yet...
  await tokenOracle.setRate(tokenB.address, DECIMALS, ownerMsg)
  // giving 10000 tokens to kyber exchange
  await tokenA.create(kyberExchange.address, 10000*DECIMALS, ownerMsg)
  await tokenB.create(kyberExchange.address, 10000*DECIMALS, ownerMsg)

  contracts = {
    owner,
    ownerMsg,
    tokenA,
    tokenB,
    tokenOracle,
    kyberExchange,
    shorting,
  }

  return contracts
}





export default getAllContracts
