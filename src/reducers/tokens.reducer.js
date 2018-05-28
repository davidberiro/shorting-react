import { tokens as tokenTypes } from '../actions/types'
import initialState from './initialState'

const actions = {
  [tokenTypes.updateTokenCount]: (state, payload) => ({
    ...state,
    tokenA: payload.tokenA,
    tokenB: payload.tokenB,
    updateTokens: false,
  }),
  [tokenTypes.receivedTokens]: (state, payload) => ({
    ...state,
    updateTokens: true,
  }),
  [tokenTypes.updateTokenPrices]: (state, payload) => ({
    ...state,
    updateTokenRates: true,
  }),
  [tokenTypes.setTokenPrices]: (state, payload) => ({
    ...state,
    updateTokenRates: false,
    tokenRates: {
      tokenA: payload.tokenA,
      tokenB: payload.tokenB,
    },
  }),
  [tokenTypes.setTokenAllowance]: (state, payload) => ({
    ...state,
    updateTokenAllowance: false,
    tokenAllowance: {
      tokenA: payload.tokenA,
      tokenB: payload.tokenB,
    },
  }),
  [tokenTypes.updateTokenAllowance]: (state, payload) => ({
    ...state,
    updateTokenAllowance: true,
  })
}

const tokens = (state = initialState.tokens, action) => {
  if (actions[action.type]) {
    return actions[action.type](state, action.payload)
  }
  return state
}

export default tokens
