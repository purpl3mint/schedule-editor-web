import {
  MEDIAPLAN_SET_SUCCEED,
  MEDIAPLAN_SET_MEDIAPLANS,
  MEDIAPLAN_SET_PRELOADER,
  MEDIAPLAN_SET_ADD_FORM,
  MEDIAPLAN_CLEAR_ADD_FORM
} from "../actions/mediaplanActions"

const initialState = {
  isSucceed: false,
  mediaplans: [],
  preloader: false,
  addForm: {
    name: "",
    userId: 1,
    ads_start_delay: 0,
    banners_start_delay: 0,
    banners_repeat: false,
    banners_animation_duration_msec: 0,
    contentId: 1,
  },
}

function mediaplanReducer (state = initialState, action) {
  switch(action.type){
    case MEDIAPLAN_SET_SUCCEED:
      return { ...state, isSucceed: action.data }
    case MEDIAPLAN_SET_MEDIAPLANS:
      return { ...state, mediaplans: action.data }
    case MEDIAPLAN_SET_PRELOADER:
      return { ...state, preloader: action.data}
    case MEDIAPLAN_SET_ADD_FORM: {
        let newAddForm = {...state.addForm, [action.data.name]: action.data.value}
        return { ...state, addForm: newAddForm }
    }
    case MEDIAPLAN_CLEAR_ADD_FORM:
      return { ...state, addForm: initialState.addForm }

    default: 
      return state
  }
}

export default mediaplanReducer