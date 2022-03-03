import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import authReducer from './reducers/authReducer'
import userReducer from './reducers/userReducer'
import contentReducer from './reducers/contentReducer'
import bannerReducer from './reducers/bannerReducer'
import tickerReducer from './reducers/tickerReducer'
import mediaplanReducer from './reducers/mediaplanReducer'

const rootReducer = combineReducers({
  authReducer,
  userReducer,
  contentReducer,
  bannerReducer,
  tickerReducer,
  mediaplanReducer,
})

const store = createStore(rootReducer, compose(
  applyMiddleware(thunk)
))

export default store