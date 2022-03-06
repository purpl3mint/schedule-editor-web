import './AddMediaplan.css'
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux"
import { mediaplanSetAddForm, mediaplanAdd } from "../../store/actionCreators/mediaplanActionCreator"

export const AddMediaplan = (props) => {
  const dispatch = useDispatch()

  //const isSucceed = useSelector(state => state.userReducer.isSucceed)
  const form = useSelector(state => state.mediaplanReducer.addForm)

  const changeHandler = useCallback( (e) => {
      dispatch(mediaplanSetAddForm(e.target.name, e.target.value))
  }, [dispatch])

  const createHandler = useCallback( () => {
      if (!form.name){
          //message("Ошибка: не задано имя пользователя")
          return
      }
      if (!form.contentId){
          //message("Ошибка: не задан пароль")
          return
      }

      dispatch(mediaplanAdd(form))

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
      <div className="row modal-content_mediaplan">

        <h1>Создание нового медиаплана</h1>
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
              <input id="contentId" name="contentId" type="number" onChange={changeHandler} />
              <label htmlFor="contentId">ID основного контента*(по умолчанию 1)</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input id="ads_start_delay" name="ads_start_delay" type="number" onChange={changeHandler} />
              <label htmlFor="ads_start_delay">Задержка воспроизведения доп контента (по умолчанию 0)</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input id="banners_start_delay" name="banners_start_delay" type="number" onChange={changeHandler} />
              <label htmlFor="banners_start_delay">Задержка воспроизведения баннеров (по умолчанию 0)</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input id="banners_animation_duration_msec" name="banners_animation_duration_msec" type="number" onChange={changeHandler} />
              <label htmlFor="banners_animation_duration_msec">Длительность воспроизведения анимации баннеров</label>
            </div>
          </div>


          <div className="row">
            <select defaultValue="-1" className="col s6 browser-default" name="banners_repeat" onChange={changeHandler}>
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