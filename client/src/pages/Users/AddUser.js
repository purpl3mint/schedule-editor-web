import './AddUser.css'
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux"
import { userSetAddForm, userAdd } from "../../store/actionCreators/userActionCreator"

export const AddUser = (props) => {
  const dispatch = useDispatch()

  //const isSucceed = useSelector(state => state.userReducer.isSucceed)
  const form = useSelector(state => state.userReducer.addForm)

  const changeHandler = useCallback( (e) => {
      dispatch(userSetAddForm(e.target.name, e.target.value))
  }, [dispatch])

  const createHandler = useCallback( () => {
      if (!form.username){
          //message("Ошибка: не задано имя пользователя")
          return
      }
      if (!form.password){
          //message("Ошибка: не задан пароль")
          return
      }

      dispatch(userAdd(form))

      props.onCreate()
  }, [dispatch, form, props])

  const closeHandler = useCallback( () => {
    props.onClose()
  }, [props])

  if (!props.show) {
    return null
  }
  
  return (
    <div className='modal'>
      <div className="row modal-content">

        <h1>Создание нового пользователя</h1>
        <div className="col s12">

          <div className="row">
            <div className="input-field col s6">
              <input id="username" name="username" type="text" className="validate" onChange={changeHandler} />
              <label htmlFor="username">Имя пользователя</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input id="password" name="password" type="text" onChange={changeHandler} />
              <label htmlFor="password">Пароль</label>
            </div>
          </div>

          <div className="row">
            <select defaultValue="-1" className="col s6 browser-default" name="type" onChange={changeHandler}>
              <option value="-1" disabled>Выберите тип пользователя</option>
              <option value="user">Обычный пользователь</option>
              <option value="admin">Администратор</option>
            </select>
          </div>

          <button className="btn blue-grey darken-1" onClick={createHandler}>Создать</button>
          <button className="btn blue-grey darken-1 btn-close" onClick={closeHandler}>Закрыть</button>

        </div>

      </div>
    </div>
    
  )
  
}