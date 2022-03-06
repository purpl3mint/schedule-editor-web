import {
  BANNER_SET_SUCCEED,
  BANNER_SET_BANNERS,
  BANNER_SET_PRELOADER,
  BANNER_SET_ADD_FORM,
  BANNER_CLEAR_ADD_FORM
} from "../actions/bannerActions"

const initialState = {
  isSucceed: false,
  banners: [],
  preloader: false,
  addForm: {
    name: "",
    userId: 1,
    url: "",
    url_reserve: "",
    online: false,
    background: "#000000",
    duration: 0,
    layout_width: "30%",
    layout_height: "20%",
    layout_gravity: "top",
  },
}

function bannerReducer (state = initialState, action) {
  switch(action.type){
    case BANNER_SET_SUCCEED:
      return { ...state, isSucceed: action.data }
    case BANNER_SET_BANNERS:
      return { ...state, banners: action.data }
    case BANNER_SET_PRELOADER:
      return { ...state, preloader: action.data}
    case BANNER_SET_ADD_FORM: {
        let newAddForm = {...state.addForm, [action.data.name]: action.data.value}
        return { ...state, addForm: newAddForm }
    }
    case BANNER_CLEAR_ADD_FORM:
      return { ...state, addForm: initialState.addForm }

    default: 
      return state
  }
}

export default bannerReducer