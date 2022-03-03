import {
  TICKER_SET_SUCCEED,
  TICKER_SET_TICKERS,
  TICKER_SET_PRELOADER
} from "../actions/tickerActions"

const initialState = {
  isSucceed: false,
  tickers: [],
  preloader: false
}

function tickerReducer (state = initialState, action) {
  switch(action.type){
    case TICKER_SET_SUCCEED:
      return { ...state, isSucceed: action.data }
    case TICKER_SET_TICKERS:
      return { ...state, tickers: action.data }
    case TICKER_SET_PRELOADER:
      return { ...state, preloader: action.data}

    default: 
      return state
  }
}

export default tickerReducer