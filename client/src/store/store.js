import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import authReducer from './reducers/authReducer'

const rootReducer = combineReducers({
  authReducer
})

const store = createStore(rootReducer, compose(
  applyMiddleware(thunk)
))

export default store