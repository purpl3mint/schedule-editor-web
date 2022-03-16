import './Mediaplan.css'
import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { mediaplanSetEditTickerForm, mediaplanEditTicker } from "../../store/actionCreators/mediaplanActionCreator"

export const EditTickerMediaplan = (props) => {
  const dispatch = useDispatch()
  const [name, setName] = useState(props.name ? props.name : "Не выбран")
  const id = useSelector(state => state.mediaplanReducer.currentMediaplan.id)
  const form = useSelector(state => state.mediaplanReducer.editTickerForm)

  const changeHandler = useCallback( (e) => {
      setName(e.target.textContent)
      dispatch(mediaplanSetEditTickerForm("tickerId", e.target.value))
  }, [dispatch, setName])

  const createHandler = useCallback( () => {
      dispatch(mediaplanEditTicker(form, id))
      props.onCreate()
  }, [dispatch, form, props, id])

  const closeHandler = useCallback( () => {
    props.onClose()
  }, [props])

  const tickerList = useSelector(state => {
    const tickerRaw = state.mediaplanReducer.tickerList

    const tickerTransformed = tickerRaw.map(item => <li value={item.id} className="collection-item" key={item.id} onClick={changeHandler}>{item.name}</li>)

    return tickerTransformed
  })

  const initializeHandler = useCallback( () => {
    dispatch(mediaplanSetEditTickerForm("mediaplanId", id))
  }, [dispatch, id])

  useEffect(() => { initializeHandler() }, [initializeHandler])

  if (!props.show) {
    return null
  }

  return (
    <div className='modal'>
      <div className="row modal-edit-options_mediaplan">

        <h1>Редактирование бегущей строки</h1>

        <span>Название: {name}</span><br/>
        
        <div className="col s12">

          <div className="row">
            <ul className="collection">
              {tickerList}
            </ul>
          </div>

          <button className="btn blue-grey darken-1" onClick={createHandler}>Выбрать</button>
          <button className="btn blue-grey darken-1 btn-close" onClick={closeHandler}>Закрыть</button>
          
        </div>

      </div>
    </div>
    
  )
  
}