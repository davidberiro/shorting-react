import { app as appTypes } from '../actions/types'
import initialState from './initialState'

const actions = {
  [appTypes.initializeApp]: (state, payload) => ({
    ...state,
    initialized: true,
  }),
  [appTypes.toggleWalletLockedModal]: (state, payload) => ({
    ...state,
    showWalletLockedModal: payload.on != null ? payload.on : !state.locked,
  }),
}

const app = (state = initialState.app, action) => {
  if (actions[action.type]) {
    return actions[action.type](state, action.payload)
  }
  return state
}

export default app
