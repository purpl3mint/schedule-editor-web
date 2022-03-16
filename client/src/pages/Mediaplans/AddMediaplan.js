import './Mediaplan.css'
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux"
import { mediaplanSetAddForm, mediaplanAdd } from "../../store/actionCreators/mediaplanActionCreator"
import { useMessage } from '../../hooks/message.hook';

export const AddMediaplan = (props) => {
  const dispatch = useDispatch()
  const message = useMessage()
  const form = useSelector(state => state.mediaplanReducer.addForm)

  const changeHandler = useCallback( (e) => {
      dispatch(mediaplanSetAddForm(e.target.name, e.target.value))
  }, [dispatch])

  const createHandler = useCallback( () => {
      if (!form.name){
          message("Ошибка: не задано название медиаплана")
          return
      }
      if (!form.contentId){
          message("Ошибка: не задан основной контент")
          return
      }

      if (form.contentId < 1) {
        message("Ошибка: id основного контента указано неверно")
        return
      }

      if (form.ads_start_delay < 1) {
        message("Ошибка: задержка воспроизведения основного контента указана неверно")
        return
      }

      if (form.banners_start_delay < 1) {
        message("Ошибка: задержка воспроизведения баннеров указана неверно")
        return
      }

      if (form.banners_animation_duration_msec < 1) {
        message("Ошибка: длительность анимации баннеров указана неверно")
        return
      }

      dispatch(mediaplanAdd(form))

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
      <div className="row modal-content_mediaplan">

        <h1>Создание нового медиаплана</h1>
        <span>* - обязательное поле</span><br />
        <div className="col s12">

          <div className="row">
            <div className="input-field col s6">
              <input id="name" name="name" type="text" value={form.name} onChange={changeHandler} />
              <span className="helper-text">Название*</span>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input id="contentId" name="contentId" type="number" value={form.contentId} onChange={changeHandler} />
              <span className="helper-text">ID основного контента*</span>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input id="ads_start_delay" name="ads_start_delay" type="number" value={form.ads_start_delay} onChange={changeHandler} />
              <span className="helper-text">Задержка воспроизведения доп контента</span>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input id="banners_start_delay" name="banners_start_delay" type="number" value={form.banners_start_delay} onChange={changeHandler} />
              <span className="helper-text">Задержка воспроизведения баннеров</span>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input id="banners_animation_duration_msec" name="banners_animation_duration_msec" type="number" value={form.banners_animation_duration_msec} onChange={changeHandler} />
              <span className="helper-text">Длительность воспроизведения анимации баннеров</span>
            </div>
          </div>


          <div className="row">
            <select defaultValue="-1" className="col s6 browser-default" name="banners_repeat" value={form.banners_repeat} onChange={changeHandler}>
              <option value="-1" disabled>Осуществлять повтор баннеров?</option>
              <option value="false">Не повторять баннеры</option>
              <option value="true">Повторять баннеры</option>
            </select>
          </div>

          <button className="btn blue-grey darken-1" onClick={createHandler}>Создать</button>
          <button className="btn blue-grey darken-1 btn-close" onClick={closeHandler}>Закрыть</button>

        </div>

      </div>
    </div>
    
  )
  
}