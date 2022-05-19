import {
  CABINET_SET_LOGIN,
  CABINET_SET_PASSWORD_FORM,
  CABINET_CLEAR_PASSWORD_FORM
} from '../actions/cabinetActions'
  
export function cabinetSetLogin(data) {
  return{
    type: CABINET_SET_LOGIN,
    data
  }
}
  
export function cabinetSetPasswordForm(name, value) {
  return{
    type: CABINET_SET_PASSWORD_FORM,
    data: {name, value}
  }
}
  
export function cabinetClearPasswordForm() {
  return{
    type: CABINET_CLEAR_PASSWORD_FORM
  }
}

export function cabinetChangePassword(form) {
  return async(dispatch) => {
    
    const method = 'PUT'
    const headers = {'Content-Type': 'application/json'}
    const body = JSON.stringify({...form})
    const responce = await fetch("/api/user/setpassword", {method, body, headers})
  
    if (responce.ok) {
      dispatch(cabinetClearPasswordForm())
    }

  }
}