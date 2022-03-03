import {
  TICKER_SET_SUCCEED,
  TICKER_SET_TICKERS,
  TICKER_SET_PRELOADER
} from "../actions/tickerActions"

export function tickerSetSucceed(data){
  return {
    type: TICKER_SET_SUCCEED,
    data
  }
}

export function tickerSetPreloader (isLoading) {
  return {
    type: TICKER_SET_PRELOADER,
    data: isLoading
  }
}

export function tickerSetTickers(data) {
  return {
    type: TICKER_SET_TICKERS,
    data
  }
}

export function tickerLoadTickers() {
  return async(dispatch) => {
    dispatch(tickerSetPreloader(true))

    const method = 'GET'
    const headers = {'Content-Type': 'application/json'}
    const responce = await fetch("/api/ticker", {method, headers})

    const data = await responce.json()
    if (responce.ok) {
      dispatch(tickerSetTickers(data))
    }

    dispatch(tickerSetPreloader(false))
  }
}