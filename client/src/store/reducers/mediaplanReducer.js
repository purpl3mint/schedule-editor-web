import {
  MEDIAPLAN_SET_SUCCEED,
  MEDIAPLAN_SET_MEDIAPLANS,
  MEDIAPLAN_SET_PRELOADER
} from "../actions/mediaplanActions"

const initialState = {
  isSucceed: false,
  mediaplans: [],
  preloader: false
}

function mediaplanReducer (state = initialState, action) {
  switch(action.type){
    case MEDIAPLAN_SET_SUCCEED:
      return { ...state, isSucceed: action.data }
    case MEDIAPLAN_SET_MEDIAPLANS:
      return { ...state, mediaplans: action.data }
    case MEDIAPLAN_SET_PRELOADER:
      return { ...state, preloader: action.data}

    default: 
      return state
  }
}

export default mediaplanReducer