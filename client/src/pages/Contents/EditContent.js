import './Contents.css'
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux"
import { contentSetEditForm, contentEdit } from "../../store/actionCreators/contentActionCreator"

export const EditContent = (props) => {
  const dispatch = useDispatch()
  const form = useSelector(state => state.contentReducer.editForm)

  const changeHandler = useCallback( (e) => {
      dispatch(contentSetEditForm(e.target.name, e.target.value))
  }, [dispatch])

  const createHandler = useCallback( () => {
      dispatch(contentEdit(form))
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

        <h1>Редактирование контента: {props.nameEditing}</h1>
        
        <div className="col s12">

          <div className="row">
            <select defaultValue={form.online} className="col s6 browser-default" name="online" onChange={changeHandler}>
              <option value="-1" disabled>Выберите тип воспроизведения (по умолчанию offline)</option>
              <option value="true">Online</option>
              <option value="false">Offline</option>
            </select>
          </div>

          <div className="row">
            <select defaultValue={form.aspect_ratio} className="col s6 browser-default" name="aspect_ratio" onChange={changeHandler}>
              <option value="-1" disabled>Выберите соотношение сторон (по умолчанию без масштабирования)</option>
              <option value="normal">Без масштабирования</option>
              <option value="crop">Срезать уходящее за пределы экрана</option>
              <option value="stretch">Подогнать под размер экрана</option>
            </select>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input id="duration" name="duration" type="number" onChange={changeHandler} defaultValue={form.duration} />
              <label htmlFor="duration">Длительность (по умолчанию 0)</label>
            </div>
          </div>

          <button className="btn blue-grey darken-1" onClick={createHandler}>Изменить</button>
          <button className="btn blue-grey darken-1 btn-close" onClick={closeHandler}>Закрыть</button>
          
        </div>

      </div>
    </div>
    
  )
  
}