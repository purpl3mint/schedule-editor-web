import React, { useCallback } from "react"

export const TickerCard = (props) => {
  const {id, name, url, size, speed, font_color, background_color} = props

  const deleteHandler = useCallback(() => {
    console.log("Deleting ticker will added later");
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
                    Размер шрифта: {size}<br/>
                    Скорость: {speed}<br/>
                    Цвет шрифта: {font_color}<br/>
                    Цвет фона: {background_color}<br/>
                </div>
            </div>

            <button name={id} className="btn" onClick={deleteHandler}>
                <i className="material-icons">delete</i>
            </button>
        </div>
  )
}