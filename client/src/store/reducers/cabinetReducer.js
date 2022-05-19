import {
    CABINET_SET_LOGIN,
    CABINET_SET_PASSWORD_FORM,
    CABINET_CLEAR_PASSWORD_FORM
  } from '../actions/cabinetActions'
  
const initialState = {
  login: 'Неизвестно',
  setPasswordForm: {
      id: 0,
      password: '',
      newPassword: ''
  }
}
  
function cabinetReducer(state = initialState, action) {
    switch(action.type){
        case CABINET_SET_LOGIN: {
            return { ...state, login: action.data }
        }
        case CABINET_SET_PASSWORD_FORM: {
            const newPasswordForm = { ...state.setPasswordForm, [action.data.name]: action.data.value}

            return { ...state, setPasswordForm: newPasswordForm }
        }

        case CABINET_CLEAR_PASSWORD_FORM: {

            return { ...state, setPasswordForm: initialState.setPasswordForm }
        }

        default: {
            return state
        }
    }
}
  
export default cabinetReducer