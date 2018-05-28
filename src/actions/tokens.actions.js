import { tokens as tokenTypes} from './types'

const updateTokenCount = ({ tokenA, tokenB }) => ({
  type: tokenTypes.updateTokenCount,
  payload: { tokenA, tokenB }
})

const receivedTokens = () => ({
  type: tokenTypes.receivedTokens,
  payload: {}
})

const updateTokenPrices = () => ({
  type: tokenTypes.updateTokenPrices,
  payload: {}
})

const setTokenPrices = ({ tokenA, tokenB }) => ({
  type: tokenTypes.setTokenPrices,
  payload: { tokenA, tokenB }
})

const setTokenAllowance = ({ tokenA, tokenB }) => ({
  type: tokenTypes.setTokenAllowance,
  payload: { tokenA, tokenB }
})

const updateTokenAllowance = () => ({
  type: tokenTypes.updateTokenAllowance,
  payload: {}
})

export { 
  updateTokenCount,
  receivedTokens,
  updateTokenPrices,
  setTokenPrices,
  updateTokenAllowance,
  setTokenAllowance,
}