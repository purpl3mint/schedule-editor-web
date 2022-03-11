import './Tickers.css'
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux"
import { tickerSetEditForm, tickerEdit } from "../../store/actionCreators/tickerActionCreator"

export const EditTicker = (props) => {
  const dispatch = useDispatch()
  const form = useSelector(state => state.tickerReducer.editForm)

  const changeHandler = useCallback( (e) => {
      dispatch(tickerSetEditForm(e.target.name, e.target.value))
  }, [dispatch])

  const createHandler = useCallback( () => {
      dispatch(tickerEdit(form))
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
      <div className="row modal-content_content modal-edit_content">

        <h1>Редактирование бегущей строки: {props.nameEditing}</h1>
        
        <div className="col s12">

        <div className="row">
            <div className="input-field col s6">
              <input defaultValue={form.size} id="size" name="size" type="text" onChange={changeHandler} />
              <label htmlFor="size">Размер шрифта</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input defaultValue={form.speed} id="speed" name="speed" type="text" onChange={changeHandler} />
              <label htmlFor="speed">Скорость</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input defaultValue={form.font_color} id="font_color" name="font_color" type="text" onChange={changeHandler} />
              <label htmlFor="font_color">Цвет шрифта</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input defaultValue={form.background_color} id="background_color" name="background_color" type="text" onChange={changeHandler} />
              <label htmlFor="background_color">Цвет фона</label>
            </div>
          </div>

          <button className="btn blue-grey darken-1" onClick={createHandler}>Изменить</button>
          <button className="btn blue-grey darken-1 btn-close" onClick={closeHandler}>Закрыть</button>
          
        </div>

      </div>
    </div>
    
  )
  
}