import {
  USER_SET_SUCCEED,
  USER_SET_USERS,
  USER_SET_PRELOADER,
  USER_SET_ADD_FORM,
  USER_CLEAR_ADD_FORM
} from "../actions/userActions"

const initialState = {
  isSucceed: false,
  users: [],
  preloader: false,
  addForm: {
    username: "",
    password: "",
    type: ""
  },
}

function userReducer (state = initialState, action) {
  switch(action.type){
    case USER_SET_SUCCEED:
      return { ...state, isSucceed: action.data }
    case USER_SET_USERS:
      return { ...state, users: action.data }
    case USER_SET_PRELOADER:
      return { ...state, preloader: action.data}
    case USER_SET_ADD_FORM: {
        let newAddForm = {...state.addForm, [action.data.name]: action.data.value}
        return { ...state, addForm: newAddForm }
    }
    case USER_CLEAR_ADD_FORM:
      return { ...state, addForm: initialState.addForm }

    default: 
      return state
  }
}

export default userReducer