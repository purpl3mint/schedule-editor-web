import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import authReducer from './reducers/authReducer'
import userReducer from './reducers/userReducer'

const rootReducer = combineReducers({
  authReducer,
  userReducer
})

const store = createStore(rootReducer, compose(
  applyMiddleware(thunk)
))

export default store