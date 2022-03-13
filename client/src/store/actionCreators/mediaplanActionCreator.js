import {
  MEDIAPLAN_SET_SUCCEED,
  MEDIAPLAN_SET_MEDIAPLANS,
  MEDIAPLAN_SET_PRELOADER,
  MEDIAPLAN_SET_ADD_FORM,
  MEDIAPLAN_CLEAR_ADD_FORM,
  MEDIAPLAN_SET_CURRENT,
  MEDIAPLAN_SET_MEDIAPLAN,

  MEDIAPLAN_SET_EDIT_OPTIONS_FORM,
  MEDIAPLAN_CLEAR_EDIT_OPTIONS_FORM,

  MEDIAPLAN_SET_EDIT_CONTENT_FORM,
  MEDIAPLAN_CLEAR_EDIT_CONTENT_FORM,
  MEDIAPLAN_SET_CONTENT_LIST,
  MEDIAPLAN_CLEAR_CONTENT_LIST,

  MEDIAPLAN_SET_EDIT_TICKER_FORM,
  MEDIAPLAN_CLEAR_EDIT_TICKER_FORM,
  MEDIAPLAN_SET_TICKER_LIST,
  MEDIAPLAN_CLEAR_TICKER_LIST,

  MEDIAPLAN_SET_EDIT_BANNER_FORM,
  MEDIAPLAN_CLEAR_EDIT_BANNER_FORM,
  MEDIAPLAN_SET_BANNER_LIST,
  MEDIAPLAN_CLEAR_BANNER_LIST,

  MEDIAPLAN_SET_EDIT_ADS_FORM,
  MEDIAPLAN_CLEAR_EDIT_ADS_FORM,
  MEDIAPLAN_SET_ADS_LIST,
  MEDIAPLAN_CLEAR_ADS_LIST,
} from "../actions/mediaplanActions"

export function mediaplanSetSucceed(data){
  return {
    type: MEDIAPLAN_SET_SUCCEED,
    data
  }
}

export function mediaplanSetPreloader (isLoading) {
  return {
    type: MEDIAPLAN_SET_PRELOADER,
    data: isLoading
  }
}

export function mediaplanSetMediaplans(data) {
  return {
    type: MEDIAPLAN_SET_MEDIAPLANS,
    data
  }
}

export function mediaplanLoadMediaplans() {
  return async(dispatch) => {
    dispatch(mediaplanSetPreloader(true))

    const method = 'GET'
    const headers = {'Content-Type': 'application/json'}
    const responce = await fetch("/api/mediaplan", {method, headers})

    const data = await responce.json()
    if (responce.ok) {
      dispatch(mediaplanSetMediaplans(data))
    }

    dispatch(mediaplanSetPreloader(false))
  }
}

export function mediaplanSetAddForm(name, value) {
  return {
    type: MEDIAPLAN_SET_ADD_FORM,
    data: {name, value}
  }
}

export function mediaplanClearAddForm () {
  return {
    type: MEDIAPLAN_CLEAR_ADD_FORM
  }
}

export function mediaplanAdd(form){
  return async(dispatch) => {
    dispatch(mediaplanSetPreloader(true))
    
    const method = 'POST'
    const headers = {'Content-Type': 'application/json'}
    const body = JSON.stringify({...form})
    const responce = await fetch("/api/mediaplan", {method, body, headers})

    if (responce.ok) {
      dispatch(mediaplanSetSucceed(true))
      dispatch(mediaplanClearAddForm())
    }

    dispatch(mediaplanSetPreloader(false))
  }
}

export function mediaplanDelete(mediaplanId) {
  return async(dispatch) => {
    dispatch(mediaplanSetPreloader(true))

    const method = 'DELETE'
    const headers = {'Content-Type': 'application/json'}
    const responce = await fetch("/api/mediaplan/" + mediaplanId, {method, headers})

    if (responce.ok) {
      dispatch(mediaplanLoadMediaplans())
    }

    dispatch(mediaplanSetPreloader(false))
  }
}

export function mediaplanSetCurrent(data){
  return {
    type: MEDIAPLAN_SET_CURRENT,
    data
  }
}

export function mediaplanSetMediaplan(data) {
  return {
    type: MEDIAPLAN_SET_MEDIAPLAN,
    data
  }
}

export function mediaplanLoadMediaplan(id) {
  return async(dispatch) => {
    dispatch(mediaplanSetPreloader(true))

    const method = 'GET'
    const headers = {'Content-Type': 'application/json'}
    const responce = await fetch("/api/mediaplan/" + id, {method, headers})

    const data = await responce.json()
    if (responce.ok) {
      dispatch(mediaplanSetMediaplan(data))
    }

    dispatch(mediaplanSetPreloader(false))
  }
}

/*Editing options in mediaplan*/
export function mediaplanSetEditOptionsForm(name, value) {
  return {
    type: MEDIAPLAN_SET_EDIT_OPTIONS_FORM,
    data: {name, value}
  }
}

export function mediaplanClearEditOptionsForm () {
  return {
    type: MEDIAPLAN_CLEAR_EDIT_OPTIONS_FORM
  }
}

export function mediaplanEditOptions (form) {
  return async(dispatch) => {
    dispatch(mediaplanSetPreloader(true))

    const method = 'PUT'
    const body = JSON.stringify({...form})
    const headers = {'Content-Type': 'application/json'}
    const responce = await fetch("/api/mediaplan/", {method, body, headers})

    if (responce.ok) {
      dispatch(mediaplanLoadMediaplans())
    }

    dispatch(mediaplanSetPreloader(false))
  }
}

/*Editing content in mediaplan*/
export function mediaplanSetEditContentForm(name, value) {
  return {
    type: MEDIAPLAN_SET_EDIT_CONTENT_FORM,
    data: {name, value}
  }
}

export function mediaplanClearEditContentForm () {
  return {
    type: MEDIAPLAN_CLEAR_EDIT_CONTENT_FORM
  }
}

export function mediaplanEditContent (form) {
  return async(dispatch) => {
    dispatch(mediaplanSetPreloader(true))

    const method = 'PUT'
    const body = JSON.stringify({...form})
    const headers = {'Content-Type': 'application/json'}
    const responce = await fetch("/api/mediaplan/", {method, body, headers})

    if (responce.ok) {
      dispatch(mediaplanLoadMediaplans())
    }

    dispatch(mediaplanSetPreloader(false))
  }
}

export function mediaplanSetContentList(data) {
  return {
    type: MEDIAPLAN_SET_CONTENT_LIST,
    data
  }
}

export function mediaplanClearContentList () {
  return {
    type: MEDIAPLAN_CLEAR_CONTENT_LIST
  }
}

export function mediaplanGetContentList () {
  return async(dispatch) => {
    dispatch(mediaplanSetPreloader(true))

    const method = 'GET'
    const headers = {'Content-Type': 'application/json'}
    const responce = await fetch("/api/content", {method, headers})

    const data = await responce.json()
    if (responce.ok) {
      dispatch(mediaplanSetContentList(data))
    }

    dispatch(mediaplanSetPreloader(false))
  }
}

/*Editing ticker in mediplan*/
export function mediaplanSetEditTickerForm(name, value) {
  return {
    type: MEDIAPLAN_SET_EDIT_TICKER_FORM,
    data: {name, value}
  }
}

export function mediaplanClearEditTickerForm () {
  return {
    type: MEDIAPLAN_CLEAR_EDIT_TICKER_FORM
  }
}

export function mediaplanEditTicker (form) {
  return async(dispatch) => {
    dispatch(mediaplanSetPreloader(true))

    const method = 'PUT'
    const body = JSON.stringify({...form})
    const headers = {'Content-Type': 'application/json'}
    const responce = await fetch("/api/mediaplan/ticker", {method, body, headers})

    if (responce.ok) {
      dispatch(mediaplanLoadMediaplans())
    }

    dispatch(mediaplanSetPreloader(false))
  }
}

export function mediaplanSetTickerList(data) {
  return {
    type: MEDIAPLAN_SET_TICKER_LIST,
    data
  }
}

export function mediaplanClearTickerList () {
  return {
    type: MEDIAPLAN_CLEAR_TICKER_LIST
  }
}

export function mediaplanGetTickerList () {
  return async(dispatch) => {
    dispatch(mediaplanSetPreloader(true))

    const method = 'GET'
    const headers = {'Content-Type': 'application/json'}
    const responce = await fetch("/api/ticker", {method, headers})

    const data = await responce.json()
    if (responce.ok) {
      dispatch(mediaplanSetTickerList(data))
    }

    dispatch(mediaplanSetPreloader(false))
  }
}

/*Editing banner in mediplan*/
export function mediaplanSetEditBannerForm(name, value) {
  return {
    type: MEDIAPLAN_SET_EDIT_BANNER_FORM,
    data: {name, value}
  }
}

export function mediaplanClearEditBannerForm () {
  return {
    type: MEDIAPLAN_CLEAR_EDIT_BANNER_FORM
  }
}

export function mediaplanEditBanner (form) {
  return async(dispatch) => {
    dispatch(mediaplanSetPreloader(true))

    const method = 'POST'
    const body = JSON.stringify({...form})
    const headers = {'Content-Type': 'application/json'}
    const responce = await fetch("/api/mediaplan/banner", {method, body, headers})

    if (responce.ok) {
      dispatch(mediaplanLoadMediaplans())
    }

    dispatch(mediaplanSetPreloader(false))
  }
}

export function mediaplanSetBannerList(data) {
  return {
    type: MEDIAPLAN_SET_BANNER_LIST,
    data
  }
}

export function mediaplanClearBannerList () {
  return {
    type: MEDIAPLAN_CLEAR_BANNER_LIST
  }
}

export function mediaplanGetBannerList () {
  return async(dispatch) => {
    dispatch(mediaplanSetPreloader(true))

    const method = 'GET'
    const headers = {'Content-Type': 'application/json'}
    const responce = await fetch("/api/banner", {method, headers})

    const data = await responce.json()
    if (responce.ok) {
      dispatch(mediaplanSetBannerList(data))
    }

    dispatch(mediaplanSetPreloader(false))
  }
}

/*Editing ads in mediaplan */
export function mediaplanSetEditAdsForm(name, value) {
  return {
    type: MEDIAPLAN_SET_EDIT_ADS_FORM,
    data: {name, value}
  }
}

export function mediaplanClearEditAdsForm () {
  return {
    type: MEDIAPLAN_CLEAR_EDIT_ADS_FORM
  }
}

export function mediaplanEditAds (form) {
  return async(dispatch) => {
    dispatch(mediaplanSetPreloader(true))

    const method = 'POST'
    const body = JSON.stringify({...form})
    const headers = {'Content-Type': 'application/json'}
    const responce = await fetch("/api/mediaplan/content", {method, body, headers})

    if (responce.ok) {
      dispatch(mediaplanLoadMediaplans())
    }

    dispatch(mediaplanSetPreloader(false))
  }
}

export function mediaplanSetAdsList(data) {
  return {
    type: MEDIAPLAN_SET_ADS_LIST,
    data
  }
}

export function mediaplanClearAdsList () {
  return {
    type: MEDIAPLAN_CLEAR_ADS_LIST
  }
}

export function mediaplanGetAdsList () {
  return async(dispatch) => {
    dispatch(mediaplanSetPreloader(true))

    const method = 'GET'
    const headers = {'Content-Type': 'application/json'}
    const responce = await fetch("/api/content", {method, headers})

    const data = await responce.json()
    if (responce.ok) {
      dispatch(mediaplanSetAdsList(data))
    }

    dispatch(mediaplanSetPreloader(false))
  }
}