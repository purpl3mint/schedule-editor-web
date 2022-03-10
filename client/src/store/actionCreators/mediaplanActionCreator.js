import {
  MEDIAPLAN_SET_SUCCEED,
  MEDIAPLAN_SET_MEDIAPLANS,
  MEDIAPLAN_SET_PRELOADER,
  MEDIAPLAN_SET_ADD_FORM,
  MEDIAPLAN_CLEAR_ADD_FORM,
  MEDIAPLAN_SET_CURRENT,
  MEDIAPLAN_SET_MEDIAPLAN,
  MEDIAPLAN_SET_EDIT_FORM,
  MEDIAPLAN_CLEAR_EDIT_FORM
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

export function mediaplanSetEditForm(name, value) {
  return {
    type: MEDIAPLAN_SET_EDIT_FORM,
    data: {name, value}
  }
}

export function mediaplanClearEditForm () {
  return {
    type: MEDIAPLAN_CLEAR_EDIT_FORM
  }
}