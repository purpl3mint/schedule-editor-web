import {
  AUTH_SET_FORM,
  AUTH_CLEAR_FORM
} from '../actions/authActions'

const initialState = {
  form: {
    username: '',
    password: ''
  }
}

function authReducer (state = initialState, action) {

  switch(action.type) {
    case AUTH_SET_FORM: {
      const newForm = {...state.form, [action.data.target]: action.data.value}
      const result = {...state, form: newForm}
      return result
    }

    case AUTH_CLEAR_FORM: {
      return {...state, form: initialState.form}
    }

    default: 
      return state
  }
}

export default authReducer