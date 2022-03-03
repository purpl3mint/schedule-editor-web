import {
  CONTENT_SET_SUCCEED,
  CONTENT_SET_CONTENTS,
  CONTENT_SET_PRELOADER
} from "../actions/contentActions"

const initialState = {
  isSucceed: false,
  contents: [],
  preloader: false
}

function contentReducer (state = initialState, action) {
  switch(action.type){
    case CONTENT_SET_SUCCEED:
      return { ...state, isSucceed: action.data }
    case CONTENT_SET_CONTENTS:
      return { ...state, contents: action.data }
    case CONTENT_SET_PRELOADER:
      return { ...state, preloader: action.data}

    default: 
      return state
  }
}

export default contentReducer