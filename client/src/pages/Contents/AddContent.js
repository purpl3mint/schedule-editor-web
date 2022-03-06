import './AddContent.css'
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux"
import { contentSetAddForm, contentAdd } from "../../store/actionCreators/contentActionCreator"

export const AddContent = (props) => {
  const dispatch = useDispatch()

  //const isSucceed = useSelector(state => state.contentReducer.isSucceed)
  const form = useSelector(state => state.contentReducer.addForm)

  console.log(form);

  const changeHandler = useCallback( (e) => {
      dispatch(contentSetAddForm(e.target.name, e.target.value))
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

      dispatch(contentAdd(form))

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
      <div className="row modal-content_content">

        <h1>Создание нового контента</h1>
        <span>* - обязательное поле</span><br />
        
        <div className="col s12">

          <div className="row">
            <div className="input-field col s6">
              <input id="name" name="name" type="text" className="validate" onChange={changeHandler} />
              <label htmlFor="name">Название контента*</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input id="url" name="url" type="text" onChange={changeHandler} />
              <label htmlFor="url">URL*</label>
            </div>
          </div>

          <div className="row">
            <select defaultValue="-1" className="col s6 browser-default" name="online" onChange={changeHandler}>
              <option value="-1" disabled>Выберите тип воспроизведения (по умолчанию offline)</option>
              <option value="true">Online</option>
              <option value="false">Offline</option>
            </select>
          </div>

          <div className="row">
            <select defaultValue="-1" className="col s6 browser-default" name="aspect_ratio" onChange={changeHandler}>
              <option value="-1" disabled>Выберите соотношение сторон (по умолчанию без масштабирования)</option>
              <option value="normal">Без масштабирования</option>
              <option value="crop">Срезать уходящее за пределы экрана</option>
              <option value="stretch">Подогнать под размер экрана</option>
            </select>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input id="duration" name="duration" type="number" onChange={changeHandler} />
              <label htmlFor="duration">Длительность (по умолчанию 0)</label>
            </div>
          </div>

          <button className="btn blue-grey darken-1" onClick={createHandler}>Создать</button>
          <button className="btn blue-grey darken-1 btn-close" onClick={closeHandler}>Закрыть</button>
          
        </div>

      </div>
    </div>
    
  )
  
}