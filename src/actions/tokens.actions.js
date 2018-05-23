import { tokens as tokenTypes} from './types'

const updateTokenCount = ({ tokenA, tokenB }) => ({
  type: tokenTypes.updateTokenCount,
  payload: { tokenA, tokenB }
})

const receivedTokens = () => ({
  type: tokenTypes.receivedTokens,
  payload: {}
})

export { updateTokenCount, receivedTokens }