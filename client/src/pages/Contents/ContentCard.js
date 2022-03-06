import React, { useCallback } from "react"
import { useDispatch } from "react-redux"
import { contentDelete } from "../../store/actionCreators/contentActionCreator"

export const ContentCard = (props) => {
  const dispatch = useDispatch()
  const {id, name, url, online, aspect_ratio, duration} = props

  const deleteHandler = useCallback(() => {
    dispatch(contentDelete(id))
  }, [dispatch, id])

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
        </div>
  )
}