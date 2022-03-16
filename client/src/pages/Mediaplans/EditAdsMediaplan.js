import './Mediaplan.css'
import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { mediaplanSetEditAdsForm, mediaplanEditAds } from "../../store/actionCreators/mediaplanActionCreator"
import { useMessage } from '../../hooks/message.hook';

export const EditAdsMediaplan = (props) => {
  const dispatch = useDispatch()
  const message = useMessage()
  const [name, setName] = useState(props.name ? props.name : "Не выбран")
  const id = useSelector(state => state.mediaplanReducer.currentMediaplan.id)
  const form = useSelector(state => state.mediaplanReducer.editAdsForm)

  const changeHandler = useCallback( (e) => {
    dispatch(mediaplanSetEditAdsForm(e.target.name, e.target.value))
  }, [dispatch])

  const chooseHandler = useCallback( (e) => {
      setName(e.target.textContent)
      dispatch(mediaplanSetEditAdsForm("contentId", e.target.value))
  }, [dispatch, setName])

  const createHandler = useCallback( () => {
      if (form.position < 0) {
        message("Ошибка: позиция в медиаплане должна быть положительным числом")
        return
      }

      dispatch(mediaplanEditAds(form))
      props.onCreate()
  }, [dispatch, form, props, message])

  const closeHandler = useCallback( () => {
    props.onClose()
  }, [props])

  const adsList = useSelector(state => {
    const adsRaw = state.mediaplanReducer.adsList

    const adsTransformed = adsRaw.map(item => 
      <li 
        value={item.id} 
        className="collection-item" 
        key={item.id} 
        onClick={chooseHandler}
      >
        {item.name}
      </li>
    )

    return adsTransformed
  })

  const initializeHandler = useCallback( () => {
    dispatch(mediaplanSetEditAdsForm("mediaplanId", id))
  }, [dispatch, id])

  useEffect(() => { initializeHandler() }, [initializeHandler])

  if (!props.show) {
    return null
  }

  return (
    <div className='modal'>
      <div className="row modal-edit-options_mediaplan">

        <h1>Добавление дополнительного контента</h1>

        <span>Выбран: {name}</span><br/>
        
        <div className="col s12">

          <div className="row">
            <div className="input-field col s6">
              <input id="position" name="position" type="text" value={form.position} onChange={changeHandler} />
              <span className="helper-text">Позиция в медиаплане</span>
            </div>
          </div>

          <div className="row">
            <ul className="collection">
              {adsList}
            </ul>
          </div>

          <button className="btn blue-grey darken-1" onClick={createHandler}>Добавить</button>
          <button className="btn blue-grey darken-1 btn-close" onClick={closeHandler}>Закрыть</button>
          
        </div>

      </div>
    </div>
    
  )
  
}