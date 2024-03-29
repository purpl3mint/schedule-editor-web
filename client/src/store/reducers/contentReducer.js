import {
  CONTENT_SET_SUCCEED,
  CONTENT_SET_CONTENTS,
  CONTENT_SET_PRELOADER,
  CONTENT_SET_ADD_FORM,
  CONTENT_CLEAR_ADD_FORM,
  CONTENT_SET_EDIT_FORM,
  CONTENT_CLEAR_EDIT_FORM
} from "../actions/contentActions"

const initialState = {
  isSucceed: false,
  contents: [],
  preloader: false,
  addForm: {
    name: "",
    userId: 1,
    url: "",
    online: false,
    aspect_ratio: "normal",
    duration: 0
  },
  editForm: {
    id: 0,
    online: false,
    aspect_ratio: "normal",
    duration: 0
  }
}

function contentReducer (state = initialState, action) {
  switch(action.type){
    case CONTENT_SET_SUCCEED:
      return { ...state, isSucceed: action.data }
    case CONTENT_SET_CONTENTS:
      return { ...state, contents: action.data }
    case CONTENT_SET_PRELOADER:
      return { ...state, preloader: action.data}
    case CONTENT_SET_ADD_FORM: {
        let newAddForm = {...state.addForm, [action.data.name]: action.data.value}
        return { ...state, addForm: newAddForm }
    }
    case CONTENT_CLEAR_ADD_FORM:
      return { ...state, editForm: initialState.editForm }
    case CONTENT_SET_EDIT_FORM: {
        let newEditForm = {...state.editForm, [action.data.name]: action.data.value}
        return { ...state, editForm: newEditForm }
    }
    case CONTENT_CLEAR_EDIT_FORM:
      return { ...state, editForm: initialState.editForm }

    default: 
      return state
  }
}

export default contentReducer