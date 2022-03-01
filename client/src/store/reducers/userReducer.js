import {
  USER_SET_SUCCEED,
  USER_SET_USERS,
  USER_SET_PRELOADER
} from "../actions/userActions"

const initialState = {
  isSucceed: false,
  users: [],
  preloader: false
}

function userReducer (state = initialState, action) {
  switch(action.type){
    case USER_SET_SUCCEED:
      return { ...state, isSucceed: action.data }
    case USER_SET_USERS:
      return { ...state, users: action.data }
    case USER_SET_PRELOADER:
      return { ...state, preloader: action.data}

    default: 
      return state
  }
}

export default userReducer