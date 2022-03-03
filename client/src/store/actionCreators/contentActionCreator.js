import {
  CONTENT_SET_SUCCEED,
  CONTENT_SET_CONTENTS,
  CONTENT_SET_PRELOADER
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