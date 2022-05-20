import React, { useCallback } from "react"
import { useDispatch } from "react-redux"
import { tickerDelete, tickerSetEditForm } from "../../store/actionCreators/tickerActionCreator"

export const TickerCard = (props) => {
  const {id, name, url, size, speed, font_color, background_color, setShowModalEdit, setNameEditing} = props
  const dispatch = useDispatch()

  const deleteHandler = useCallback(() => {
    dispatch(tickerDelete(id))
  }, [dispatch, id])

  const editHandler = useCallback(() => {
    dispatch(tickerSetEditForm("id", id))
    dispatch(tickerSetEditForm("name", name))
    dispatch(tickerSetEditForm("size", size))
    dispatch(tickerSetEditForm("speed", speed))
    dispatch(tickerSetEditForm("font_color", font_color))
    dispatch(tickerSetEditForm("background_color", background_color))
    setNameEditing(url)
    setShowModalEdit(true)
  }, [dispatch, id, size, speed, font_color, background_color, setShowModalEdit, setNameEditing, url, name])

  return (
    <div className="row">
            <div className="col s10">
                <div
                    className="collection-item card" 
                    style={{marginBottom: "25px", border: "1px solid grey"}}
                >
                    {name}<br/>
                    URL: {url}<br/>
                    Размер шрифта: {size}<br/>
                    Скорость: {speed}<br/>
                    Цвет шрифта: {font_color}<br/>
                    Цвет фона: {background_color}<br/>
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