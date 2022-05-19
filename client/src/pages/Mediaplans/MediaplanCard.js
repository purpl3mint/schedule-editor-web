import React, { useCallback } from "react"
import { useDispatch } from "react-redux"
import { NavLink } from 'react-router-dom'
import { mediaplanDelete } from "../../store/actionCreators/mediaplanActionCreator"
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
    let mediaplanObj = {
      name
    }

    //Add 'content' object
    if (content) {
      mediaplanObj['content'] = {
        name: content.name,
        url: content.url,
        online: content.online,
        aspect_ratio: content.aspect_ratio,
        duration: content.duration
      }
    } else {
      mediaplanObj['content'] = {}
    }

    //Add 'banners' object
    if (MediaplanBanner.length > 0) {
      const mediaplanBannerTransformed = []

      for (let i = 0; i < MediaplanBanner.length; i++) {
        for (let j = 0; j < MediaplanBanner[i].banner_in_mediaplan.position.length; j++) {
          mediaplanBannerTransformed[MediaplanBanner[i].banner_in_mediaplan.position[j]] = MediaplanBanner[i]
        }
      }

      mediaplanObj['banners'] = {}
      mediaplanObj['banners']['items'] = mediaplanBannerTransformed.filter(item => item !== undefined).map(item => {
        let result = {
          name: item.name,
          url: item.url,
          url_reserve: item.url_reserve,
          online: item.online,
          background: item.background,
          layout_width: item.layout_width,
          layout_height: item.layout_height,
          layout_gravity: item.layout_gravity
        }

        return result
      })
      mediaplanObj['banners']['start_delay'] = banners_start_delay
      mediaplanObj['banners']['repeat'] = banners_repeat
      mediaplanObj['banners']['animation_duration_msec'] = banners_animation_duration_msec
    }

    //Add 'ticker' object
    if (ticker) {
      mediaplanObj['ticker'] = {
        name: ticker.name,
        url: ticker.url,
        size: ticker.size,
        speed: ticker.speed,
        font_color: ticker.font_color,
        background_color: ticker.background_color
      }
    }

    //Add 'ads' object
    if (MediaplanContent.length > 0) {
      const mediaplanContentTransformed = []

      for (let i = 0; i < MediaplanContent.length; i++) {
        for (let j = 0; j < MediaplanContent[i].ads.position.length; j++) {
          mediaplanContentTransformed[MediaplanContent[i].ads.position[j]] = MediaplanContent[i]
        }
      }

      mediaplanObj['ads'] = {}
      mediaplanObj['ads']['items'] = mediaplanContentTransformed.filter(item => item !== undefined).map(item => {
        let result = {
          name: item.name,
          url: item.url,
          online: item.online,
          aspect_ratio: item.aspect_ratio,
          duration: item.duration
        }

        return result
      })
      mediaplanObj['ads']['start_delay'] = ads_start_delay
    }

    exportToJson([mediaplanObj], mediaplanObj.name)
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