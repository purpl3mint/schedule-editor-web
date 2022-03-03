import {
  BANNER_SET_SUCCEED,
  BANNER_SET_BANNERS,
  BANNER_SET_PRELOADER
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