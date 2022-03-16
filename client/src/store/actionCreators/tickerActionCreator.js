import {
  TICKER_SET_SUCCEED,
  TICKER_SET_TICKERS,
  TICKER_SET_PRELOADER,
  TICKER_SET_ADD_FORM,
  TICKER_CLEAR_ADD_FORM,
  TICKER_SET_EDIT_FORM,
  TICKER_CLEAR_EDIT_FORM
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

export function tickerSetAddForm(name, value) {
  return {
    type: TICKER_SET_ADD_FORM,
    data: {name, value}
  }
}

export function tickerClearAddForm () {
  return {
    type: TICKER_CLEAR_ADD_FORM
  }
}

export function tickerAdd(form){
  return async(dispatch) => {
    dispatch(tickerSetPreloader(true))
    
    const method = 'POST'
    const headers = {'Content-Type': 'application/json'}
    const body = JSON.stringify({...form})
    const responce = await fetch("/api/ticker", {method, body, headers})

    if (responce.ok) {
      dispatch(tickerSetSucceed(true))
      dispatch(tickerClearAddForm())
      dispatch(tickerLoadTickers())
    }

    dispatch(tickerSetPreloader(false))
  }
}

export function tickerDelete(userId) {
  return async(dispatch) => {
    dispatch(tickerSetPreloader(true))

    const method = 'DELETE'
    const headers = {'Content-Type': 'application/json'}
    const responce = await fetch("/api/ticker/" + userId, {method, headers})

    if (responce.ok) {
      dispatch(tickerLoadTickers())
    }

    dispatch(tickerSetPreloader(false))
  }
}

export function tickerSetEditForm(name, value) {
  return {
    type: TICKER_SET_EDIT_FORM,
    data: {name, value}
  }
}

export function tickerClearEditForm () {
  return {
    type: TICKER_CLEAR_EDIT_FORM
  }
}

export function tickerEdit(form) {
  return async(dispatch) => {
    dispatch(tickerSetPreloader(true))

    const method = 'PUT'
    const body = JSON.stringify({...form})
    const headers = {'Content-Type': 'application/json'}
    const responce = await fetch("/api/ticker/", {method, body, headers})

    if (responce.ok) {
      dispatch(tickerLoadTickers())
    }

    dispatch(tickerSetPreloader(false))
  }
}
