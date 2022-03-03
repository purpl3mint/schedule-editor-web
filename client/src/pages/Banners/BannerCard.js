import React, { useCallback } from "react"

export const BannerCard = (props) => {
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
    layout_gravity
  } = props

  const deleteHandler = useCallback(() => {
    console.log("Deleting banner will added later");
  }, [])

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
        </div>
  )
}