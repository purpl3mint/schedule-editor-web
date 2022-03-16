import './Tickers.css'
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux"
import { tickerSetAddForm, tickerAdd } from "../../store/actionCreators/tickerActionCreator"
import { useMessage } from '../../hooks/message.hook';

export const AddTicker = (props) => {
  const dispatch = useDispatch()
  const form = useSelector(state => state.tickerReducer.addForm)
  const message = useMessage()
  const regexpUrl = /^(http|https):\/\/[a-zA-Z-0-9\.]+((\/[a-zA-Z0-9]+)+(\.(txt|txt)))$/
  const regexpColor = /^#(([0-9a-fA-F]{6})|([0-9a-fA-F]{8}))$/

  const changeHandler = useCallback( (e) => {
      console.log(form);
      dispatch(tickerSetAddForm(e.target.name, e.target.value))
  }, [dispatch, form])

  const createHandler = useCallback( () => {
      if (!form.name){
          message("Ошибка: не задано название бегущей строки")
          return
      }
      
      if (!form.url){
          message("Ошибка: не задан URL")
          return
      }

      if (!form.size){
          message("Ошибка: не задан размер шрифта")
          return
      }

      if (!regexpUrl.test(form.url)) {
        console.log(form.url);
        message("Ошибка: некорректный URL")
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

      dispatch(tickerAdd(form))
      props.onCreate()
  }, [dispatch, form, props, message, regexpUrl, regexpColor])

  const closeHandler = useCallback( () => {
    props.onClose()
  }, [props])

  if (!props.show) {
    return null
  }
  
  return (
    <div className='modal'>
      <div className="row modal-content_ticker">

        <h1>Создание новой бегущей строки</h1>
        <span>* - обязательное поле</span><br />
        <div className="col s12">

          <div className="row">
            <div className="input-field col s6">
              <input id="name" name="name" type="text" className="validate" value={form.name} onChange={changeHandler} />
              <label htmlFor="name">Название*</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input id="url" name="url" type="text" value={form.url} onChange={changeHandler} />
              <label htmlFor="url">URL*</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input id="size" name="size" type="text" value={form.size} onChange={changeHandler} />
              <label htmlFor="size">Размер шрифта</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input id="speed" name="speed" type="text" value={form.speed} onChange={changeHandler} />
              <label htmlFor="speed">Скорость</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input id="font_color" name="font_color" type="text" value={form.font_color} onChange={changeHandler} />
              <label htmlFor="font_color">Цвет шрифта</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input id="background_color" name="background_color" type="text" value={form.background_color} onChange={changeHandler} />
              <label htmlFor="background_color">Цвет фона</label>
            </div>
          </div>

          <button className="btn blue-grey darken-1" onClick={createHandler}>Создать</button>
          <button className="btn blue-grey darken-1 btn-close" onClick={closeHandler}>Закрыть</button>

        </div>

      </div>
    </div>
    
  )
  
}