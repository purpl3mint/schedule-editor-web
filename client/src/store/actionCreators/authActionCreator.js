import {
  AUTH_SET_FORM,
  AUTH_CLEAR_FORM
} from '../actions/authActions'

export function authSetForm (target, value) {
  return {
    type: AUTH_SET_FORM,
    data: {target, value}
  }
}

export function authClearForm () {
  return {
    type: AUTH_CLEAR_FORM
  }
}

export function authLogin (form, authContext) {
  return async (dispatch) => {
    const method = 'POST'
    const headers = {'Content-Type': 'application/json'}
    const body = JSON.stringify({...form})

    const responce = await fetch("/api/user/login", {method, headers, body})
    const data = await responce.json()
    if (responce.ok){
      authContext.login(data)
      dispatch(authClearForm())
    }
  }
}