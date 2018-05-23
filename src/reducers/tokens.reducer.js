import { tokens as tokenTypes } from '../actions/types'
import initialState from './initialState'

const actions = {
  [tokenTypes.updateTokenCount]: (state, payload) => ({
    tokenA: payload.tokenA,
    tokenB: payload.tokenB,
    updateTokens: false,
  }),
  [tokenTypes.receivedTokens]: (state, payload) => ({
    ...state,
    updateTokens: true,
  }),
}

const tokens = (state = initialState.tokens, action) => {
  if (actions[action.type]) {
    return actions[action.type](state, action.payload)
  }
  return state
}

export default tokens
