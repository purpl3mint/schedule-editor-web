import React, { useCallback } from "react"

export const MediaplanCard = (props) => {
  const {
    name, 
    id, 
    ads_start_delay,
    banners_start_delay,
    banners_repeat,
    banners_animation_duration_msec,
    commonContentId,
    tickerId,
    MediaplanBanner,
    MediaplanContent
  } = props

  const deleteHandler = useCallback(() => {
    console.log("Deleting mediaplan will added later");
  }, [])

  return (
    <div className="row">
            <div className="col s10">
                <div
                    className="collection-item card" 
                    style={{marginBottom: "25px", border: "1px solid grey"}}
                >
                    {name}<br/>
                    Задержка дополнительного контента: {ads_start_delay}<br/>
                    Задержка баннеров: {banners_start_delay}<br/>
                    Повтор баннеров: {banners_repeat ? "Да" : "Нет"}<br/>
                    Длительность воспроизведения баннеров: {banners_animation_duration_msec}<br/>
                    ID основного конента: {commonContentId ? commonContentId : "Не определено"}<br/>
                    ID бегущей строки: {tickerId ? tickerId : "Не определено"}<br/>
                    Количество баннеров: {MediaplanBanner.length}<br/>
                    Количество дополнительного контента: {MediaplanContent.length}<br/>
                </div>
            </div>

            <button name={id} className="btn" onClick={deleteHandler}>
                <i className="material-icons">delete</i>
            </button>
        </div>
  )
}