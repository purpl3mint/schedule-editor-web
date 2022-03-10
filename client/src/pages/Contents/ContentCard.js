import React, { useCallback } from "react"
import { useDispatch } from "react-redux"
import { contentDelete, contentSetEditForm } from "../../store/actionCreators/contentActionCreator"

export const ContentCard = (props) => {
  const dispatch = useDispatch()
  const {id, name, url, online, aspect_ratio, duration, setShowModalEdit, setNameEditing} = props

  const deleteHandler = useCallback(() => {
    dispatch(contentDelete(id))
  }, [dispatch, id])

  const editHandler = useCallback(() => {
    dispatch(contentSetEditForm("id", id))
    dispatch(contentSetEditForm("online", online))
    dispatch(contentSetEditForm("aspect_ratio", aspect_ratio))
    dispatch(contentSetEditForm("duration", duration))
    setNameEditing(name)
    setShowModalEdit(true)
  }, [dispatch, id, online, aspect_ratio, duration, setShowModalEdit, setNameEditing, name])

  return (
    <div className="row">
            <div className="col s10">
                <div
                    className="collection-item card" 
                    style={{marginBottom: "25px", border: "1px solid grey"}}
                >
                    {name}<br/>
                    URL: {url}<br/>
                    {online && <span style={{color: "green"}}>Онлайн</span>}
                    {!online && <span style={{color: "red"}}>Оффлайн</span>}
                    <br/>
                    Соотношение сторон: {aspect_ratio}<br/>
                    Длительность: {duration}<br/>
                </div>
            </div>

            <button name={id} className="btn" onClick={deleteHandler}>
                <i className="material-icons">delete</i>
            </button>

            <button name={id} className="btn" onClick={editHandler}>
                <i className="material-icons">edit</i>
            </button>
        </div>
  )
}