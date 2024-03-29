import React, { useCallback } from "react"
import { useDispatch } from "react-redux"
import { bannerDelete, bannerSetEditForm } from "../../store/actionCreators/bannerActionCreator"

export const BannerCard = (props) => {
  const dispatch = useDispatch()
  const {
    id, 
    name, 
    url, 
    url_reserve, 
    online, 
    duration, 
    background, 
    layout_width, 
    layout_height, 
    layout_gravity,
    setShowModalEdit,
    setNameEditing
  } = props

  const deleteHandler = useCallback(() => {
    dispatch(bannerDelete(id))
  }, [dispatch, id])

  const editHandler = useCallback(() => {
    dispatch(bannerSetEditForm("id", id))
    dispatch(bannerSetEditForm("online", online))
    dispatch(bannerSetEditForm("background", background))
    dispatch(bannerSetEditForm("duration", duration))
    dispatch(bannerSetEditForm("layout_width", layout_width))
    dispatch(bannerSetEditForm("layout_height", layout_height))
    dispatch(bannerSetEditForm("layout_gravity", layout_gravity))
    setNameEditing(name)
    setShowModalEdit(true)
  }, [
    dispatch, 
    id, 
    online, 
    background, 
    duration, 
    layout_width, 
    layout_height, 
    layout_gravity, 
    setShowModalEdit, 
    setNameEditing, 
    name
  ])

  return (
    <div className="row">
            <div className="col s10">
                <div
                    className="collection-item card" 
                    style={{marginBottom: "25px", border: "1px solid grey"}}
                >
                    {name}<br/>
                    URL: {url}<br/>
                    URL резервный: {url_reserve}<br/>
                    {online && <span style={{color: "green"}}>Онлайн</span>}
                    {!online && <span style={{color: "red"}}>Оффлайн</span>}
                    <br/>
                    Длительность: {duration}<br/>
                    Цвет фона: {background}<br/>
                    Ширина: {layout_width}<br/>
                    Высота: {layout_height}<br/>
                    Расположение: {layout_gravity}<br/>
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