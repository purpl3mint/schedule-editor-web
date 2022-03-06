import {
  USER_SET_SUCCEED,
  USER_SET_USERS,
  USER_SET_PRELOADER,
  USER_SET_ADD_FORM,
  USER_CLEAR_ADD_FORM
} from "../actions/userActions"

export function userSetSucceed(data){
  return {
    type: USER_SET_SUCCEED,
    data
  }
}

export function userSetPreloader (isLoading) {
  return {
    type: USER_SET_PRELOADER,
    data: isLoading
  }
}

export function userSetUsers(data) {
  return {
    type: USER_SET_USERS,
    data
  }
}

export function userLoadUsers() {
  return async(dispatch) => {
    dispatch(userSetPreloader(true))

    const method = 'GET'
    const headers = {'Content-Type': 'application/json'}
    const responce = await fetch("/api/user", {method, headers})

    const data = await responce.json()
    if (responce.ok) {
      dispatch(userSetUsers(data))
    }

    dispatch(userSetPreloader(false))
  }
}

export function userSetAddForm(name, value) {
  return {
    type: USER_SET_ADD_FORM,
    data: {name, value}
  }
}

export function userClearAddForm () {
  return {
    type: USER_CLEAR_ADD_FORM
  }
}

export function userAdd(form){
  return async(dispatch) => {
    dispatch(userSetPreloader(true))
    
    const method = 'POST'
    const headers = {'Content-Type': 'application/json'}
    const body = JSON.stringify({...form})
    const responce = await fetch("/api/user/registration", {method, body, headers})

    if (responce.ok) {
      dispatch(userSetSucceed(true))
      dispatch(userClearAddForm())
    }

    dispatch(userSetPreloader(false))
  }
}

export function userDelete(userId) {
  return async(dispatch) => {
    dispatch(userSetPreloader(true))

    const method = 'DELETE'
    const headers = {'Content-Type': 'application/json'}
    const responce = await fetch("/api/user/" + userId, {method, headers})

    if (responce.ok) {
      dispatch(userLoadUsers())
    }

    dispatch(userSetPreloader(false))
  }
}