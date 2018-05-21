import Web3 from 'web3'


let globalWeb3

const getWeb3 = async () => {
  if (globalWeb3) return globalWeb3

  // Wait for loading completion to avoid race conditions with web3 injection timing.
  await new Promise(resolve => window.addEventListener('load', resolve))
  let web3 = window.web3
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider.
    web3 = new Web3(web3.currentProvider)
    console.log('Injected web3 detected.')
  } else {
    // Fallback to infura if no web3 injection
    const web3Provider =
      process.env.REACT_APP_WEB3_PROVIDER || 'http://localhost:9545/'
    const provider = new Web3.providers.HttpProvider(web3Provider)
    web3 = new Web3(provider)
    console.log('No web3 instance injected, using', web3Provider)
  }

  globalWeb3 = web3

  return web3
}

export const fromWei = (number, unit) => globalWeb3.fromWei(number, unit)

// export const getLatestBlockTimestamp = callback => {
//   // metamask doesn't like the promise format of this method, so we're passing a callback
//   // we could promisify this wrapper function though ourselves
//   globalWeb3.eth.getBlock('latest', (error, block) => callback(block.timestamp))
// }

export default getWeb3
