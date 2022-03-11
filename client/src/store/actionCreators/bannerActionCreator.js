import {
  BANNER_SET_SUCCEED,
  BANNER_SET_BANNERS,
  BANNER_SET_PRELOADER,
  BANNER_SET_ADD_FORM,
  BANNER_CLEAR_ADD_FORM,
  BANNER_SET_EDIT_FORM,
  BANNER_CLEAR_EDIT_FORM
} from "../actions/bannerActions"

export function bannerSetSucceed(data){
  return {
    type: BANNER_SET_SUCCEED,
    data
  }
}

export function bannerSetPreloader (isLoading) {
  return {
    type: BANNER_SET_PRELOADER,
    data: isLoading
  }
}

export function bannerSetBanners(data) {
  return {
    type: BANNER_SET_BANNERS,
    data
  }
}

export function bannerLoadBanners() {
  return async(dispatch) => {
    dispatch(bannerSetPreloader(true))

    const method = 'GET'
    const headers = {'Content-Type': 'application/json'}
    const responce = await fetch("/api/banner", {method, headers})

    const data = await responce.json()
    if (responce.ok) {
      dispatch(bannerSetBanners(data))
    }

    dispatch(bannerSetPreloader(false))
  }
}

export function bannerSetAddForm(name, value) {
  return {
    type: BANNER_SET_ADD_FORM,
    data: {name, value}
  }
}

export function bannerClearAddForm () {
  return {
    type:   BANNER_CLEAR_ADD_FORM

  }
}

export function bannerAdd(form){
  return async(dispatch) => {
    dispatch(bannerSetPreloader(true))
    
    const method = 'POST'
    const headers = {'Content-Type': 'application/json'}
    const body = JSON.stringify({...form})
    const responce = await fetch("/api/banner", {method, body, headers})

    if (responce.ok) {
      dispatch(bannerSetSucceed(true))
      dispatch(bannerClearAddForm())
    }

    dispatch(bannerSetPreloader(false))
  }
}

export function bannerDelete(bannerId) {
  return async(dispatch) => {
    dispatch(bannerSetPreloader(true))

    const method = 'DELETE'
    const headers = {'Content-Type': 'application/json'}
    const responce = await fetch("/api/banner/" + bannerId, {method, headers})

    if (responce.ok) {
      dispatch(bannerLoadBanners())
    }

    dispatch(bannerSetPreloader(false))
  }
}

export function bannerSetEditForm(name, value) {
  return {
    type: BANNER_SET_EDIT_FORM,
    data: {name, value}
  }
}

export function bannerClearEditForm () {
  return {
    type: BANNER_CLEAR_EDIT_FORM
  }
}

export function bannerEdit(form) {
  return async(dispatch) => {
    dispatch(bannerSetPreloader(true))

    const method = 'PUT'
    const body = JSON.stringify({...form})
    const headers = {'Content-Type': 'application/json'}
    const responce = await fetch("/api/banner/", {method, body, headers})

    if (responce.ok) {
      dispatch(bannerLoadBanners())
    }

    dispatch(bannerSetPreloader(false))
  }
}