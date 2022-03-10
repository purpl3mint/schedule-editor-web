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
  editForm: {
    name: "",
    ads_start_delay: 0,
    banners_start_delay: 0,
    banners_repeat: false,
    banners_animation_duration_msec: 0,
    common_content: {},
    ticker: {}
  },
  currentMediaplanId: 0,
  currentMediaplan: {
    id: 0,
    name: "",
    ads_start_delay: 0,
    banners_start_delay: 0,
    banners_repeat: false,
    banners_animation_duration_msec: 0,
    userId: 1,
    commonContentId: 0,
    tickerId: 0,
    common_content: 0,
    MediaplanBanner: [],
    ticker: {},
    MediaplanContent: []
  }
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
    case MEDIAPLAN_SET_CURRENT:
      return { ...state, currentMediaplanId: action.data}
    case MEDIAPLAN_SET_MEDIAPLAN:
      return { ...state, currentMediaplan: action.data}
    case MEDIAPLAN_SET_EDIT_FORM: {
      let newEditForm = {...state.editForm, [action.data.name]: action.data.value}
      return { ...state, editForm: newEditForm }
    }
    case MEDIAPLAN_CLEAR_EDIT_FORM:
      return { ...state, editForm: initialState.editForm }

    default: 
      return state
  }
}

export default mediaplanReducer