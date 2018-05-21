import { app as appTypes, web3 as web3Types } from '../actions/types'
import initialState from './initialState'

const actions = {
  [appTypes.initializeApp]: (state, payload) => ({
    user: payload.user,
    provider: payload.isMetaMask ? 'META_MASK' : 'UNKNOWN',
    network: payload.network,
  }),
  [web3Types.setUserAddress]: (state, payload) => ({
    ...state,
    user: payload.user,
  }),
}

const web3 = (state = initialState.web3, action) => {
  if (actions[action.type]) {
    return actions[action.type](state, action.payload)
  }
  return state
}

export default web3
