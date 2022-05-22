import './Banners.css'
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux"
import { bannerSetAddForm, bannerAdd } from "../../store/actionCreators/bannerActionCreator"
import { useMessage } from '../../hooks/message.hook';

export const AddBanner = (props) => {
  const dispatch = useDispatch()
  const form = useSelector(state => state.bannerReducer.addForm)
  const message = useMessage()


  const changeHandler = useCallback( (e) => {
      dispatch(bannerSetAddForm(e.target.name, e.target.value))
  }, [dispatch])

  const createHandler = useCallback( () => {
      const regexpUrl = /^((http|https):\/\/)?[a-zA-Z-0-9\-_.]+[:[0-9]+]?((\/[a-zA-Z0-9\-=+.()?_,:;]+)+(.(gif|png|bmp|jpg|m3u8|mp4)))?$/
      const regexpColor = /^#(([0-9a-fA-F]{6})|([0-9a-fA-F]{8}))$/
      
      if (!form.name){
          message("Ошибка: не задано название баннера")
          return
      }
      if (!form.url){
          message("Ошибка: не задан URL баннера")
          return
      }

      if (!regexpUrl.test(form.url)) {
        message("Ошибка: недопустимый тип контента, измените URL")
        return
      }

      if (form.url_reserve.length !== 0 && !regexpUrl.test(form.url_reserve)) {
        message("Ошибка: недопустимый тип контента, измените резервный URL")
        return
      }

      if (!regexpColor.test(form.background)) {
        message("Ошибка: некорректный цвет фона")
        return
      }

      if (form.duration < 0) {
        message("Ошибка: длительность не может быть меньше 0")
        return
      }

      dispatch(bannerAdd(form))
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
      <div className="row modal-content_banner">

        <h1>Создание нового баннера</h1>
        <span>* - обязательное поле</span><br />
        <div className="col s12">

          <div className="row">
            <div className="input-field col s10">
              <input id="name" name="name" type="text" value={form.name} onChange={changeHandler} />
              <span className="helper-text">Название баннера*</span>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s10">
              <input id="url" name="url" type="text" value={form.url} onChange={changeHandler} />
              <span className="helper-text">URL*</span>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s10">
              <input id="url_reserve" name="url_reserve" type="text" value={form.url_reserve} onChange={changeHandler} />
              <span className="helper-text">URL резервный</span>
            </div>
          </div>

          <div className="row">
            <select defaultValue="-1" className="col s10 browser-default" name="online" value={form.online} onChange={changeHandler}>
              <option value="-1" disabled>Выберите тип воспроизведения (по умолчанию offline)</option>
              <option value="true">Online</option>
              <option value="false">Offline</option>
            </select>
          </div>

          <div className="row">
            <div className="input-field col s10">
              <input id="background" name="background" type="text" value={form.background} onChange={changeHandler} />
              <span className="helper-text">Цвет фона</span>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s10">
              <input id="duration" name="duration" type="number" value={form.duration} onChange={changeHandler} />
              <span className="helper-text">Длительность</span>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s10">
              <input id="layout_width" name="layout_width" type="text" value={form.layout_width} onChange={changeHandler} />
              <span className="helper-text">Ширина баннера (проценты/wrap_content/match_parent)</span>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s10">
              <input id="layout_height" name="layout_height" type="text" value={form.layout_height} onChange={changeHandler} />
              <span className="helper-text">Высота баннера (проценты/wrap_content/match_parent)</span>
            </div>
          </div>

          <div className="row">
            <select defaultValue="-1" className="col s10 browser-default" name="layout_gravity" value={form.layout_gravity} onChange={changeHandler}>
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

          <button className="btn blue-grey darken-1" onClick={createHandler}>Создать</button>
          <button className="btn blue-grey darken-1 btn-close" onClick={closeHandler}>Закрыть</button>

        </div>

      </div>
    </div>
    
  )
  
}