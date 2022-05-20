import './Tickers.css'
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux"
import { tickerSetEditForm, tickerEdit } from "../../store/actionCreators/tickerActionCreator"
import { useMessage } from '../../hooks/message.hook';

export const EditTicker = (props) => {
  const dispatch = useDispatch()
  const message = useMessage()
  const form = useSelector(state => state.tickerReducer.editForm)

  const changeHandler = useCallback( (e) => {
      dispatch(tickerSetEditForm(e.target.name, e.target.value))
  }, [dispatch])

  const createHandler = useCallback( () => {
      const regexpColor = /^#(([0-9a-fA-F]{6})|([0-9a-fA-F]{8}))$/

      if (!form.size){
          message("Ошибка: не задан размер шрифта")
          return
      }

      if (form.size <= 0) {
          message("Ошибка: размер шрифта должен быть положительным числом")
          return
      }

      if (form.speed <= 0) {
        message("Ошибка: скорость текста должна быть положительным числом")
        return
      }

      if (!regexpColor.test(form.font_color)){
        message("Ошибка: некорректный цвет шрифта")
        return
      }

      if (!regexpColor.test(form.background_color)){
        message("Ошибка: некорректный цвет фона")
        return
      }

      dispatch(tickerEdit(form))
      props.onCreate()
  }, [dispatch, form, props, message])

  const closeHandler = useCallback( () => {
    props.onClose()
  }, [props])

  if (!props.show) {
    return null
  }

  return (
    <div className='modal'>
      <div className="row modal-content_content modal-edit_content">

        <h1>Редактирование бегущей строки: {(form && form.name) || "название неизвестно"}</h1>
        
        <div className="col s12">

        <div className="row">
            <div className="input-field col s6">
              <input defaultValue={form.size} id="size" name="size" type="text" onChange={changeHandler} />
              <span className="helper-text">Размер шрифта</span>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input defaultValue={form.speed} id="speed" name="speed" type="text" onChange={changeHandler} />
              <span className="helper-text">Скорость</span>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input defaultValue={form.font_color} id="font_color" name="font_color" type="text" onChange={changeHandler} />
              <span className="helper-text">Цвет шрифта</span>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input defaultValue={form.background_color} id="background_color" name="background_color" type="text" onChange={changeHandler} />
              <span className="helper-text">Цвет фона</span>
            </div>
          </div>

          <button className="btn blue-grey darken-1" onClick={createHandler}>Изменить</button>
          <button className="btn blue-grey darken-1 btn-close" onClick={closeHandler}>Закрыть</button>
          
        </div>

      </div>
    </div>
    
  )
  
}