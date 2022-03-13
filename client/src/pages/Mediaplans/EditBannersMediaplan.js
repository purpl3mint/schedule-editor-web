import './Mediaplan.css'
import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { mediaplanSetEditBannerForm, mediaplanEditBanner } from "../../store/actionCreators/mediaplanActionCreator"

export const EditBannersMediaplan = (props) => {
  const dispatch = useDispatch()
  const [name, setName] = useState(props.name ? props.name : "Не выбран")
  const id = useSelector(state => state.mediaplanReducer.currentMediaplan.id)
  const form = useSelector(state => state.mediaplanReducer.editBannerForm)

  const changeHandler = useCallback( (e) => {
    dispatch(mediaplanSetEditBannerForm(e.target.name, e.target.value))
  }, [dispatch])

  const chooseHandler = useCallback( (e) => {
      setName(e.target.textContent)
      dispatch(mediaplanSetEditBannerForm("bannerId", e.target.value))
  }, [dispatch, setName])

  const createHandler = useCallback( () => {
      dispatch(mediaplanEditBanner(form))
      props.onCreate()
  }, [dispatch, form, props])

  const closeHandler = useCallback( () => {
    props.onClose()
  }, [props])

  const bannerList = useSelector(state => {
    console.log(state.mediaplanReducer.bannerList);
    const bannerRaw = state.mediaplanReducer.bannerList

    const bannerTransformed = bannerRaw.map(item => 
      <li 
        value={item.id} 
        className="collection-item" 
        key={item.id} 
        onClick={chooseHandler}
      >
        {item.name}
      </li>
    )

    return bannerTransformed
  })

  const initializeHandler = useCallback( () => {
    dispatch(mediaplanSetEditBannerForm("mediaplanId", id))
  }, [dispatch, id])

  useEffect(() => { initializeHandler() }, [initializeHandler])

  if (!props.show) {
    return null
  }

  return (
    <div className='modal'>
      <div className="row modal-edit-options_mediaplan">

        <h1>Добавление баннера</h1>

        <span>Выбран: {name}</span><br/>
        
        <div className="col s12">

          <div className="row">
            <div className="input-field col s6">
              <input id="position" name="position" type="text" onChange={changeHandler} />
              <label htmlFor="position">Позиция в медиаплане</label>
            </div>
          </div>

          <div className="row">
            <ul className="collection">
              {bannerList}
            </ul>
          </div>

          <button className="btn blue-grey darken-1" onClick={createHandler}>Добавить</button>
          <button className="btn blue-grey darken-1 btn-close" onClick={closeHandler}>Закрыть</button>
          
        </div>

      </div>
    </div>
    
  )
  
}