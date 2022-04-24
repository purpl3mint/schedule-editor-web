import './AddUser.css'
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { userSetAddForm, userAdd } from "../../store/actionCreators/userActionCreator"
import { useMessage } from '../../hooks/message.hook';

export const AddUser = (props) => {
  const dispatch = useDispatch()
  const message = useMessage()
  const form = useSelector(state => state.userReducer.addForm)

  const changeHandler = useCallback( (e) => {
      dispatch(userSetAddForm(e.target.name, e.target.value))
  }, [dispatch])

  const createHandler = useCallback( () => {
      if (!form.username){
          message("Ошибка: не задано имя пользователя")
          return
      }
      if (!form.password){
          message("Ошибка: не задан пароль")
          return
      }

      dispatch(userAdd(form))

      props.onCreate()
  }, [dispatch, form, props, message])

  const closeHandler = useCallback( () => {
    props.onClose()
  }, [props])

  const initializeHandler = useCallback( () => {
    dispatch(userSetAddForm("type", "admin"))
  }, [dispatch])

  useEffect( () => initializeHandler(), [initializeHandler])

  if (!props.show) {
    return null
  }
  
  return (
    <div className='modal'>
      <div className="row modal-content">

        <h1>Создание нового пользователя</h1>
        <span>* - обязательное поле</span><br />
        <div className="col s12">

          <div className="row">
            <div className="input-field col s6">
              <input id="username" name="username" type="text" value={form.username} onChange={changeHandler} />
              <span className="helper-text">Имя пользователя*</span>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input id="password" name="password" type="text" value={form.password} onChange={changeHandler} />
              <span className="helper-text">Пароль*</span>
            </div>
          </div>

          <button className="btn blue-grey darken-1" onClick={createHandler}>Создать</button>
          <button className="btn blue-grey darken-1 btn-close" onClick={closeHandler}>Закрыть</button>

        </div>

      </div>
    </div>
    
  )
  
}

/*
          <div className="row">
            <select defaultValue="-1" className="col s6 browser-default" name="type" value={form.type} onChange={changeHandler}>
              <option value="-1" disabled>Выберите тип пользователя*</option>
              <option value="user">Обычный пользователь</option>
              <option value="admin">Администратор</option>
            </select>
          </div>
*/