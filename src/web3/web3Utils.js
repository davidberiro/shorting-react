import _ from 'lodash'
import contract from 'truffle-contract'
import getWeb3 from './getWeb3'

export async function callAsync(instance, method, ...args) {
  console.log(`callAsync. ${method}: ${args}`)
  const options = args[args.length - 1]
  console.log('options:', options)
  // if (options) options.gas = 1000000
  return new Promise(function(resolve, reject) {
    instance[method](...args, (err, res) => {
      if (err) reject(err)
      else resolve(res)

      if (res) console.log('res:', res)
    })
  })
}

// move somewhere more general probably
export const promisify = inner =>
  new Promise((resolve, reject) =>
    inner((err, res) => (err ? reject(err) : resolve(res)))
  )

export const getAccounts = web3 => promisify(web3.eth.getAccounts)

export const getAccount = async web3 => {
  const res = await getAccounts(web3)
  return res[0]
}

// returns the filter so that we can call `filter.stopWatching()` to stop listening
export const listenForLatestBlocks = (web3, onSuccess) => {
  const filter = web3.eth.filter('latest')

  filter.watch((error, log) => {
    if (error) {
      console.error(`Error listening to latest blocks: ${error}`)
    } else {
      onSuccess(log)
    }
  })

  return filter
}

export const listenForTransaction = (web3, transactionHash, callback) => {
  console.log('LISTENING FOR TRANSACTION', transactionHash)
  const filter = listenForLatestBlocks(web3, blockHash => {
    console.log('FOUND NEW BLOCK')
    web3.eth.getBlock(blockHash, true, (err, block) => {
      if (err) return console.error(`Error: ${err}`)
      const { transactions } = block
      if (_.find(transactions, ({ hash }) => hash === transactionHash)) {
        console.log('FOUND TRANSACTION', transactionHash)
        filter.stopWatching()
        callback && callback(transactionHash)
      }
    })
  })
}

let web3

// TODO potentially even remove web3 from being returned in this function
// truffleContract should contain at least the following properties: abi, unlinked_binary
export const getContractInstance = async (truffleContract, address) => {
  let instance
  web3 = web3 || (await getWeb3())

  try {
    const c = contract({
      ...truffleContract,
      address,
    })

    c.setProvider(web3.currentProvider)

    instance = address ? await c.at(address) : await c.deployed()
  } catch (error) {
    console.error('Error in getContractInstance:', error)
  }

  return { instance, web3 }
}

export const sendTransaction = async (
  web3,
  instance,
  methodName,
  args,
  options,
  successCallback
) => {
  try {
    if (!options.from) options.from = await getAccount(web3)

    const result = await instance[methodName].sendTransaction(...args, options)
    listenForTransaction(web3, result, successCallback)

    return result
  } catch (err) {
    console.error(err)
    // throw e
  }
}
