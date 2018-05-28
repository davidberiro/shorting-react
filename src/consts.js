const DEFAULT_NETWORK_ID = process.env.REACT_APP_DEFAULT_NETWORK_ID || '4447'

const DEFAULT_NETWORK_NAME =
  process.env.REACT_APP_DEFAULT_NETWORK_NAME || 'Private Network'

const ETHERSCAN_URL =
  process.env.REACT_APP_ETHERSCAN_ADDRESS || 'https://etherscan.io'

const DEFAULT_API_URL = 'http://localhost:5000'

const DECIMALS = parseFloat(Math.pow(10, 18))

export {
  DEFAULT_NETWORK_ID,
  DEFAULT_NETWORK_NAME,
  ETHERSCAN_URL,
  DEFAULT_API_URL,
  DECIMALS
}