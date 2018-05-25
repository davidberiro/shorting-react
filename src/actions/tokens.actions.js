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

export { updateTokenCount, receivedTokens, updateTokenPrices, setTokenPrices }