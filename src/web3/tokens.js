import getContractInstance from './getContract'
import getWeb3 from './getWeb3'

const contractA = require('../../build/contracts/TokenA.json')
const contractB = require('../../build/contracts/TokenB.json')

async function setAllowance(tokenType, address, amount, from) {
  let web3 = await getWeb3()
  let provider = web3.currentProvider
  let token = tokenType == 'A' ? await getContractInstance(contractA, provider) : await getContractInstance(contractB, provider)
  await token.approve(address, amount, {from : from, gas: 300000})
  // console.log('approved')
}

export { setAllowance }