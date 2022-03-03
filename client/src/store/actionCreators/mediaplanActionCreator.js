import {
  MEDIAPLAN_SET_SUCCEED,
  MEDIAPLAN_SET_MEDIAPLANS,
  MEDIAPLAN_SET_PRELOADER
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