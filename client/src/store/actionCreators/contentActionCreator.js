import {
  CONTENT_SET_SUCCEED,
  CONTENT_SET_CONTENTS,
  CONTENT_SET_PRELOADER,
  CONTENT_SET_ADD_FORM,
  CONTENT_CLEAR_ADD_FORM,
  CONTENT_SET_EDIT_FORM,
  CONTENT_CLEAR_EDIT_FORM
} from "../actions/contentActions"


export function contentSetSucceed(data){
  return {
    type: CONTENT_SET_SUCCEED,
    data
  }
}

export function contentSetPreloader (isLoading) {
  return {
    type: CONTENT_SET_PRELOADER,
    data: isLoading
  }
}

export function contentSetContents(data) {
  return {
    type: CONTENT_SET_CONTENTS,
    data
  }
}

export function contentLoadContents() {
  return async(dispatch) => {
    dispatch(contentSetPreloader(true))

    const method = 'GET'
    const headers = {'Content-Type': 'application/json'}
    const responce = await fetch("/api/content", {method, headers})

    const data = await responce.json()
    if (responce.ok) {
      dispatch(contentSetContents(data))
    }

    dispatch(contentSetPreloader(false))
  }
}

export function contentSetAddForm(name, value) {
  return {
    type: CONTENT_SET_ADD_FORM,
    data: {name, value}
  }
}

export function contentClearAddForm () {
  return {
    type: CONTENT_CLEAR_ADD_FORM
  }
}

export function contentAdd(form){
  return async(dispatch) => {
    dispatch(contentSetPreloader(true))
    
    const method = 'POST'
    const headers = {'Content-Type': 'application/json'}
    const body = JSON.stringify({...form})
    const responce = await fetch("/api/content", {method, body, headers})

    if (responce.ok) {
      dispatch(contentSetSucceed(true))
      dispatch(contentClearAddForm())
      dispatch(contentLoadContents())
    }

    dispatch(contentSetPreloader(false))
  }
}

export function contentDelete(contentId) {
  return async(dispatch) => {
    dispatch(contentSetPreloader(true))

    const method = 'DELETE'
    const headers = {'Content-Type': 'application/json'}
    const responce = await fetch("/api/content/" + contentId, {method, headers})

    if (responce.ok) {
      dispatch(contentLoadContents())
    }

    dispatch(contentSetPreloader(false))
  }
}

export function contentSetEditForm(name, value) {
  return {
    type: CONTENT_SET_EDIT_FORM,
    data: {name, value}
  }
}

export function contentClearEditForm () {
  return {
    type: CONTENT_CLEAR_EDIT_FORM
  }
}

export function contentEdit(form) {
  return async(dispatch) => {
    dispatch(contentSetPreloader(true))

    const method = 'PUT'
    const body = JSON.stringify({...form})
    const headers = {'Content-Type': 'application/json'}
    const responce = await fetch("/api/content/", {method, body, headers})

    if (responce.ok) {
      dispatch(contentLoadContents())
    }

    dispatch(contentSetPreloader(false))
  }
}
