import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import testReducer from './reducers/testReducer'
import test2Reducer from './reducers/test2Reducer'

const rootReducer = combineReducers({
  testReducer,
  test2Reducer
})

const store = createStore(rootReducer, compose(
  applyMiddleware(thunk)
))

export default store