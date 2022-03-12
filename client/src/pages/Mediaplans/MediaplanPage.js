import React, { useCallback, useEffect, useState } from "react";
import { Preloader } from "../../components/Preloader";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { mediaplanGetContentList, mediaplanSetEditOptionsForm } from "../../store/actionCreators/mediaplanActionCreator";
import { EditOptionsMediaplan } from "./EditOptionsMediaplan";
import { EditContentMediaplan } from "./EditContentMediaplan";

export const MediaplanPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const successPath = "/mediaplans"
  const [showModalOptions, setShowModalOptions] = useState(false)
  const [showModalContent, setShowModalContent] = useState(false)
  const [tab1, setTab1] = useState(true)
  const [tab2, setTab2] = useState(false)
  const [tab3, setTab3] = useState(false)
  const [tab4, setTab4] = useState(false)
  const [tab5, setTab5] = useState(false)

  const currentMediaplan = useSelector(state => state.mediaplanReducer.currentMediaplan)
  const loading = useSelector(state => state.mediaplanReducer.preloader)
  const banners = useSelector(state => {
    if (!state.mediaplanReducer.currentMediaplan.MediaplanBanner || 
        state.mediaplanReducer.currentMediaplan.MediaplanBanner.length === 0)
      return <span>Баннеры отсутствуют</span>
    const rawBanners = state.mediaplanReducer.currentMediaplan.MediaplanBanner

    const transformedBanners = rawBanners.map(banner => 
    <li className="collection-item" key={banner.id}>
      <span>{banner.name}</span><br/>
      <span>{banner.online ? "Онлайн" : "Оффлайн"}</span><br/>
      <span>Длительность: {banner.duration}</span>
    </li>)

    return transformedBanners
  })

  const ads = useSelector(state => {
    if (!state.mediaplanReducer.currentMediaplan.MediaplanContent ||
        state.mediaplanReducer.currentMediaplan.MediaplanContent.length === 0)
      return <span>Дополнительный контент отсутствует</span>

    const rawAds = state.mediaplanReducer.currentMediaplan.MediaplanContent
    const transformedAds = rawAds.map(ad => 
      <li className="collection-item" key={ad.id}>
        <span>{ad.name}</span><br/>
        <span>{ad.online ? "Онлайн" : "Оффлайн"}</span><br/>
        <span>Длительность: {ad.duration}</span>
      </li>)
  
    return transformedAds
  })

  const editOptionsHandler = useCallback( () => {
    dispatch(mediaplanSetEditOptionsForm("id", currentMediaplan.id))
    dispatch(mediaplanSetEditOptionsForm("ads_start_delay", currentMediaplan.ads_start_delay))
    dispatch(mediaplanSetEditOptionsForm("banners_start_delay", currentMediaplan.banners_start_delay))
    dispatch(mediaplanSetEditOptionsForm("banners_repeat", currentMediaplan.banners_repeat))
    dispatch(mediaplanSetEditOptionsForm("banners_animation_duration_msec", currentMediaplan.banners_animation_duration_msec))
    //dispatch(mediaplanSetEditOptionsForm("contentId", currentMediaplan.contentId))
    setShowModalOptions(true)
  }, [
    dispatch, 
    currentMediaplan.id, 
    currentMediaplan.ads_start_delay, 
    currentMediaplan.banners_start_delay, 
    currentMediaplan.banners_repeat,
    currentMediaplan.banners_animation_duration_msec, 
    currentMediaplan.contentId,
    setShowModalOptions
  ])

  const editContentHandler = useCallback( () => {
    dispatch(mediaplanGetContentList())
    setShowModalContent(true)
  }, [dispatch, setShowModalContent])

  /*
  const initializeHandler = useCallback( () => {
    //dispatch(mediaplanLoadMediaplans())
    //dispatch(mediaplanSetSucceed(false))
  }, [dispatch])

  useEffect(() => { initializeHandler() }, [initializeHandler])
  */

  return (
    <div>
      <h1>Медиаплан: {currentMediaplan.name || "Без названия"}</h1>

      {loading && <Preloader />}

      {!loading && 
        
      <div className="row" style={{marginBottom: "0px"}}>
        <div className="col">
          <ul className="tabs">
            <li className="tab col"><button className="btn" onClick={() => {
              setTab1(true)
              setTab2(false)
              setTab3(false)
              setTab4(false)
              setTab5(false)
            }}>Общие параметры</button></li>
            <li className="tab col"><button className="btn"onClick={() => {
              setTab1(false)
              setTab2(true)
              setTab3(false)
              setTab4(false)
              setTab5(false)
            }}>Основной контент</button></li>
            <li className="tab col"><button className="btn" onClick={() => {
              setTab1(false)
              setTab2(false)
              setTab3(true)
              setTab4(false)
              setTab5(false)
            }}>Баннеры</button></li>
            <li className="tab col"><button className="btn" onClick={() => {
              setTab1(false)
              setTab2(false)
              setTab3(false)
              setTab4(true)
              setTab5(false)
            }}>Бегущая строка</button></li>
            <li className="tab col"><button className="btn" onClick={() => {
              setTab1(false)
              setTab2(false)
              setTab3(false)
              setTab4(false)
              setTab5(true)
            }}>Дополнительный контент</button></li>
          </ul>

        </div>
      </div>
      
      }

      {tab1 && 
      <div className="col s9 offset-s3">
        <button 
          className="btn" 
          style={{marginTop: "0"}}
          onClick={editOptionsHandler}
        >
          Изменить основные параметры
        </button>
        
        <div>
          <ul className="collection">
            <li className="collection-item">Название: {currentMediaplan.name}</li>
            <li className="collection-item">Задержка дополнительного контента: {currentMediaplan.ads_start_delay} мсек</li>
            <li className="collection-item">Задержка воспроизведения баннеров: {currentMediaplan.banners_start_delay} мсек</li>
            <li className="collection-item">Повтор баннеров: {currentMediaplan.banners_repeat ? 'Повторять' : "Не повторять"}</li>
            <li className="collection-item">Длительность анимации баннеров: {currentMediaplan.banners_animation_duration_msec} мсек</li>
          </ul>
        </div>

        <EditOptionsMediaplan
          show={showModalOptions}
          onCreate={() => {
            setShowModalOptions(false)
            navigate(successPath)
          }}
          onClose={() => {
            setShowModalOptions(false)
          }}
        />
      </div>
      }

      {tab2 &&
      <div className="col s9 offset-s3">
        <button 
          className="btn" 
          style={{marginTop: "0"}}
          onClick={editContentHandler}
        >Выбрать основной контент</button>
        <div>
          <ul className="collection">
            <li className="collection-item">Основной контент: {currentMediaplan.common_content ? currentMediaplan.common_content.name : "Не определено"}</li>
          </ul>
        </div>

        <EditContentMediaplan
          show={showModalContent}
          onCreate={() => {
            setShowModalContent(false)
            navigate(successPath)
          }}
          onClose={() => {
            setShowModalContent(false)
          }}
          name={currentMediaplan.common_content ? currentMediaplan.common_content.name : undefined}
        />

      </div>
      }
      
      {tab3 &&
      <div className="col s9 offset-s3">
        <button className="btn" style={{marginTop: "0"}}>Добавить баннер</button>
        <div style={{overflowY: "scroll"}}>
          <ul className="collection">
            {banners}
          </ul>
        </div>
      </div>
      }
      
      {tab4 &&
      <div className="col s9 offset-s3">
        <button className="btn" style={{marginTop: "0"}}>Выбрать бегущую строку</button>
        <div>
          <ul className="collection">
            <li className="collection-item">Бегущая строка: {currentMediaplan.ticker ? currentMediaplan.ticker.url : "Не определено"}</li>
          </ul>
        </div>
      </div>
      }
      
      {tab5 &&
      <div className="col s9 offset-s3">
        <button className="btn" style={{marginTop: "0"}}>Добавить дополнительный контент</button>
        <div style={{overflowY: "scroll"}}>
          <ul className="collection">
            {ads}
          </ul>
        </div>
      </div>
      }

    </div>
  )
}