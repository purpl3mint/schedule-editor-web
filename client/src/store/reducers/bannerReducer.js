import {
  BANNER_SET_SUCCEED,
  BANNER_SET_BANNERS,
  BANNER_SET_PRELOADER
} from "../actions/bannerActions"

const initialState = {
  isSucceed: false,
  banners: [],
  preloader: false
}

function bannerReducer (state = initialState, action) {
  switch(action.type){
    case BANNER_SET_SUCCEED:
      return { ...state, isSucceed: action.data }
    case BANNER_SET_BANNERS:
      return { ...state, banners: action.data }
    case BANNER_SET_PRELOADER:
      return { ...state, preloader: action.data}

    default: 
      return state
  }
}

export default bannerReducer