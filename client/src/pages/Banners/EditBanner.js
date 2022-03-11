import './Banners.css'
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux"
import { bannerSetEditForm, bannerEdit } from "../../store/actionCreators/bannerActionCreator"

export const EditBanner = (props) => {
  const dispatch = useDispatch()
  const form = useSelector(state => state.bannerReducer.editForm)

  const changeHandler = useCallback( (e) => {
      dispatch(bannerSetEditForm(e.target.name, e.target.value))
  }, [dispatch])

  const createHandler = useCallback( () => {
      dispatch(bannerEdit(form))
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

        <h1>Редактирование баннера: {props.nameEditing}</h1>
        
        <div className="col s12">

          <div className="row">
            <select defaultValue={form.online} className="col s6 browser-default" name="online" onChange={changeHandler}>
              <option value="-1" disabled>Выберите тип воспроизведения (по умолчанию offline)</option>
              <option value="true">Online</option>
              <option value="false">Offline</option>
            </select>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input defaultValue={form.background} id="background" name="background" type="text" onChange={changeHandler} />
              <label htmlFor="background">Цвет фона(по умолчанию #000000)</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input id="duration" name="duration" type="number" onChange={changeHandler} defaultValue={form.duration} />
              <label htmlFor="duration">Длительность (по умолчанию 0)</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input defaultValue={form.layout_width} id="layout_width" name="layout_width" type="text" onChange={changeHandler} />
              <label htmlFor="layout_width">Ширина баннера (проценты/wrap_content/match_parent)</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input defaultValue={form.layout_height} id="layout_height" name="layout_height" type="text" onChange={changeHandler} />
              <label htmlFor="layout_height">Высота баннера (проценты/wrap_content/match_parent)</label>
            </div>
          </div>

          <div className="row">
            <select defaultValue={form.layout_gravity} className="col s6 browser-default" name="layout_gravity" onChange={changeHandler}>
              <option value="-1" disabled>Выравнивание по стороне экрана (по умолчанию верхний край)</option>
              <option value="top">Верхний край</option>
              <option value="bottom">Нижний край</option>
              <option value="left">Левый край</option>
              <option value="right">Правый край</option>
              <option value="center">Центр</option>
              <option value="top|center">Верхний край|Центр</option>
              <option value="bottom|center">Нижний край|Центр</option>
              <option value="left|center">Левый край|Центр</option>
              <option value="right|center">Правый край|Центр</option>
            </select>
          </div>

          <button className="btn blue-grey darken-1" onClick={createHandler}>Изменить</button>
          <button className="btn blue-grey darken-1 btn-close" onClick={closeHandler}>Закрыть</button>
          
        </div>

      </div>
    </div>
    
  )
  
}