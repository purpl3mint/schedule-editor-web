import './AddMediaplan.css'
import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { mediaplanSetEditContentForm, mediaplanEditContent } from "../../store/actionCreators/mediaplanActionCreator"

export const EditContentMediaplan = (props) => {
  const dispatch = useDispatch()
  const [name, setName] = useState(props.name ? props.name : "Не выбран")
  const id = useSelector(state => state.mediaplanReducer.currentMediaplan.id)
  const form = useSelector(state => state.mediaplanReducer.editContentForm)

  const changeHandler = useCallback( (e) => {
      setName(e.target.textContent)
      dispatch(mediaplanSetEditContentForm("commonContentId", e.target.value))
  }, [dispatch, setName])

  const createHandler = useCallback( () => {
      dispatch(mediaplanEditContent(form))
      props.onCreate()
  }, [dispatch, form, props])

  const closeHandler = useCallback( () => {
    props.onClose()
  }, [props])

  const contentList = useSelector(state => {
    const contentRaw = state.mediaplanReducer.contentList

    const contentTransformed = contentRaw.map(item => <li value={item.id} className="collection-item" key={item.id} onClick={changeHandler}>{item.name}</li>)

    return contentTransformed
  })

  const initializeHandler = useCallback( () => {
    dispatch(mediaplanSetEditContentForm("id", id))
  }, [dispatch, id])

  useEffect(() => { initializeHandler() }, [initializeHandler])

  if (!props.show) {
    return null
  }

  return (
    <div className='modal'>
      <div className="row modal-edit-options_mediaplan">

        <h1>Редактирование основного контента</h1>

        <span>Название контента: {name}</span><br/>
        
        <div className="col s12">

          <div className="row">
            <ul className="collection">
              {contentList}
            </ul>
          </div>

          <button className="btn blue-grey darken-1" onClick={createHandler}>Выбрать</button>
          <button className="btn blue-grey darken-1 btn-close" onClick={closeHandler}>Закрыть</button>
          
        </div>

      </div>
    </div>
    
  )
  
}