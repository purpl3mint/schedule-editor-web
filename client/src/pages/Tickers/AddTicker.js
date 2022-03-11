import './Tickers.css'
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux"
import { tickerSetAddForm, tickerAdd } from "../../store/actionCreators/tickerActionCreator"

export const AddTicker = (props) => {
  const dispatch = useDispatch()

  //const isSucceed = useSelector(state => state.userReducer.isSucceed)
  const form = useSelector(state => state.tickerReducer.addForm)

  const changeHandler = useCallback( (e) => {
      dispatch(tickerSetAddForm(e.target.name, e.target.value))
  }, [dispatch])

  const createHandler = useCallback( () => {
      if (!form.name){
          //message("Ошибка: не задано имя пользователя")
          return
      }
      if (!form.url){
          //message("Ошибка: не задан пароль")
          return
      }

      dispatch(tickerAdd(form))

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
      <div className="row modal-content_ticker">

        <h1>Создание новой бегущей строки</h1>
        <span>* - обязательное поле</span><br />
        <div className="col s12">

          <div className="row">
            <div className="input-field col s6">
              <input id="name" name="name" type="text" className="validate" onChange={changeHandler} />
              <label htmlFor="name">Название*</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input id="url" name="url" type="text" onChange={changeHandler} />
              <label htmlFor="url">URL*</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input id="size" name="size" type="text" onChange={changeHandler} />
              <label htmlFor="size">Размер шрифта</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input id="speed" name="speed" type="text" onChange={changeHandler} />
              <label htmlFor="speed">Скорость</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input id="font_color" name="font_color" type="text" onChange={changeHandler} />
              <label htmlFor="font_color">Цвет шрифта</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input id="background_color" name="background_color" type="text" onChange={changeHandler} />
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