import './Mediaplan.css'
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux"
import { mediaplanSetEditOptionsForm, mediaplanEditOptions } from "../../store/actionCreators/mediaplanActionCreator"

export const EditOptionsMediaplan = (props) => {
  const dispatch = useDispatch()
  const form = useSelector(state => state.mediaplanReducer.editOptionsForm)

  const changeHandler = useCallback( (e) => {
      dispatch(mediaplanSetEditOptionsForm(e.target.name, e.target.value))
  }, [dispatch])

  const createHandler = useCallback( () => {
      dispatch(mediaplanEditOptions(form))
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
      <div className="row modal-edit-options_mediaplan">

        <h1>Редактирование параметров</h1>
        
        <div className="col s12">

          <div className="row">
            <div className="input-field col s6">
              <input defaultValue={form.ads_start_delay} id="ads_start_delay" name="ads_start_delay" type="number" onChange={changeHandler} />
              <label htmlFor="ads_start_delay">Задержка воспроизведения доп контента (по умолчанию 0)</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input defaultValue={form.banners_start_delay} id="banners_start_delay" name="banners_start_delay" type="number" onChange={changeHandler} />
              <label htmlFor="banners_start_delay">Задержка воспроизведения баннеров (по умолчанию 0)</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input defaultValue={form.banners_animation_duration_msec} id="banners_animation_duration_msec" name="banners_animation_duration_msec" type="number" onChange={changeHandler} />
              <label htmlFor="banners_animation_duration_msec">Длительность воспроизведения анимации баннеров</label>
            </div>
          </div>

          <div className="row">
            <select defaultValue={form.banners_repeat} className="col s6 browser-default" name="banners_repeat" onChange={changeHandler}>
              <option value="-1" disabled>Осуществлять повтор баннеров?</option>
              <option value="false">Не повторять баннеры</option>
              <option value="true">Повторять баннеры</option>
            </select>
          </div>

          <button className="btn blue-grey darken-1" onClick={createHandler}>Изменить</button>
          <button className="btn blue-grey darken-1 btn-close" onClick={closeHandler}>Закрыть</button>
          
        </div>

      </div>
    </div>
    
  )
  
}