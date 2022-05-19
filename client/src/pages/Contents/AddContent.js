import './Contents.css'
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux"
import { contentSetAddForm, contentAdd } from "../../store/actionCreators/contentActionCreator"
import { useMessage } from '../../hooks/message.hook';

export const AddContent = (props) => {

  const dispatch = useDispatch()
  const form = useSelector(state => state.contentReducer.addForm)
  const message = useMessage()

  const changeHandler = useCallback( (e) => {
      dispatch(contentSetAddForm(e.target.name, e.target.value))
  }, [dispatch])

  const createHandler = useCallback( () => {
      const regexpUrl = /^(http|https):\/\/[a-zA-Z-0-9\-_.]+((\/[a-zA-Z0-9\-=+.()?_,:;]+)+(.(mp4|gif|png|bmp|jpg|m3u8)))?$/

      if (!form.name){
          message("Ошибка: не задано имя контента")
          return
      }
      if (!form.url){
          message("Ошибка: не задан url контента")
          return
      }

      if (regexpUrl.test(form.url)) {
        dispatch(contentAdd(form))
      } else {
        message("Ошибка: недопустимый тип контента, измените URL")
        return
      }

      if (form.duration < 0){
        message("Ошибка: длительность не может быть меньше 0")
        return
      }

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
      <div className="row modal-content_content">

        <h1>Создание нового контента</h1>
        <span>* - обязательное поле</span><br />
        
        <div className="col s12">

          <div className="row">
            <div className="input-field col s10">
              <input id="name" name="name" type="text" value={form.name} onChange={changeHandler} />
              <span className="helper-text">Название контента*</span>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s10">
              <input id="url" name="url" type="text" value={form.url} onChange={changeHandler} />
              <span className="helper-text">URL*</span>
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
            <select defaultValue="-1" className="col s10 browser-default" name="aspect_ratio" value={form.aspect_ratio} onChange={changeHandler}>
              <option value="-1" disabled>Выберите соотношение сторон (по умолчанию без масштабирования)</option>
              <option value="normal">Без масштабирования</option>
              <option value="crop">Срезать уходящее за пределы экрана</option>
              <option value="stretch">Подогнать под размер экрана</option>
            </select>
          </div>

          <div className="row">
            <div className="input-field col s10">
              <input id="duration" name="duration" type="number" value={form.duration} onChange={changeHandler} />
              <span className="helper-text">Длительность</span>
            </div>
          </div>

          <button className="btn blue-grey darken-1" onClick={createHandler}>Создать</button>
          <button className="btn blue-grey darken-1 btn-close" onClick={closeHandler}>Закрыть</button>
          
        </div>

      </div>
    </div>
    
  )
  
}