import React, { useCallback } from "react"
import { useDispatch } from "react-redux"
import { NavLink } from 'react-router-dom'
import { mediaplanDelete, mediaplanLoadMediaplan, mediaplanSetCurrent } from "../../store/actionCreators/mediaplanActionCreator"
import { exportToJson } from "./../../utils/saveMediaplan"

export const MediaplanCard = (props) => {
  const {
    name, 
    id, 
    ads_start_delay,
    banners_start_delay,
    banners_repeat,
    banners_animation_duration_msec,
    content,
    ticker,
    MediaplanBanner,
    MediaplanContent
  } = props
  const dispatch = useDispatch()

  const deleteHandler = useCallback(() => {
    dispatch(mediaplanDelete(id))
  }, [dispatch, id])

  const saveHandler = useCallback(() => {
    let mediaplan = {
      name,
      ads_start_delay,
      banners_start_delay,
      banners_repeat,
      banners_animation_duration_msec
    }

    if (content) {
      mediaplan['content'] = content
    } else {
      mediaplan['content'] = {}
    }

    if (ticker) { mediaplan['ticker'] = ticker }
    if (MediaplanBanner.length > 0) { mediaplan['banners'] = MediaplanBanner }
    if (MediaplanContent.length > 0) { mediaplan['ads'] = MediaplanContent }

    exportToJson(mediaplan, mediaplan.name)
  }, [
    name,
    ads_start_delay,
    banners_start_delay,
    banners_repeat,
    banners_animation_duration_msec,
    content,
    ticker,
    MediaplanContent,
    MediaplanBanner
  ])

  return (
    <div className="row">
            <div className="col s10">
                <NavLink to={"" + id}
                    className="collection-item card" 
                    style={{marginBottom: "25px", border: "1px solid grey"}}
                >
                    {name}<br/>
                    Задержка дополнительного контента: {ads_start_delay}<br/>
                    Задержка баннеров: {banners_start_delay}<br/>
                    Повтор баннеров: {banners_repeat ? "Да" : "Нет"}<br/>
                    Длительность воспроизведения баннеров: {banners_animation_duration_msec}<br/>
                    Основногй конент: {content ? content.name : "Не определено"}<br/>
                    Бегущая строка: {ticker ? ticker.name : "Не определено"}<br/>
                    Количество баннеров: {MediaplanBanner.length}<br/>
                    Количество дополнительного контента: {MediaplanContent.length}<br/>
                </NavLink>
            </div>

            <button name={id} className="btn" onClick={deleteHandler}>
                <i className="material-icons">delete</i>
            </button>

            <button name={id} className="btn" onClick={saveHandler}>
                <i className="material-icons">save</i>
            </button>
        </div>
  )
}