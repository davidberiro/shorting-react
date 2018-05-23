import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import app from './app.reducer'
import web3 from './web3.reducer'
import tokens from './tokens.reducer'


export default combineReducers({
  app,
  web3,
  tokens,
  router: routerReducer,
})
