import { createStore } from 'redux'
// import thunkMiddleware from 'redux-thunk'
// import { routerMiddleware } from 'react-router-redux'
import rootReducer from './reducers'


const store = createStore(rootReducer)

export default store
