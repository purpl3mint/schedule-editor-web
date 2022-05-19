import React, { useCallback, useState, useEffect } from "react";
import { Preloader } from "../../components/Preloader";
import { useDispatch, useSelector } from 'react-redux';
import { 
  mediaplanGetContentList, 
  mediaplanSetEditOptionsForm, 
  mediaplanGetTickerList,
  mediaplanGetBannerList,
  mediaplanGetAdsList,
  mediaplanDeleteBanner,
  mediaplanDeleteAds,
  mediaplanLoadMediaplan,
  mediaplanSetCurrent
} from "../../store/actionCreators/mediaplanActionCreator";
import { EditOptionsMediaplan } from "./EditOptionsMediaplan";
import { EditContentMediaplan } from "./EditContentMediaplan";
import { EditTickerMediaplan } from "./EditTickerMediaplan";
import { EditBannersMediaplan } from "./EditBannersMediaplan";
import { EditAdsMediaplan } from "./EditAdsMediaplan";

export const MediaplanPage = () => {
  const dispatch = useDispatch()
  const [showModalOptions, setShowModalOptions] = useState(false)
  const [showModalContent, setShowModalContent] = useState(false)
  const [showModalTicker, setShowModalTicker] = useState(false)
  const [showModalBanner, setShowModalBanner] = useState(false)
  const [showModalAds, setShowModalAds] = useState(false)
  const [tab1, setTab1] = useState(true)
  const [tab2, setTab2] = useState(false)
  const [tab3, setTab3] = useState(false)
  const [tab4, setTab4] = useState(false)
  const [tab5, setTab5] = useState(false)

  const idMediaplan = useSelector(state => state.mediaplanReducer.currentMediaplan.id)

  const deleteBannerHandler = useCallback( (idBanner, e) => {
    if (e.target.parentNode.localName === "button")
      dispatch(mediaplanDeleteBanner(idBanner, idMediaplan, e.target.parentNode.value))
    else
      dispatch(mediaplanDeleteBanner(idBanner, idMediaplan, e.target.value))
  }, [dispatch, idMediaplan])

  const deleteAdsHandler = useCallback( (idAds, e) => {
    if (e.target.parentNode.localName === "button")
      dispatch(mediaplanDeleteAds(idAds, idMediaplan, e.target.parentNode.value))
    else
      dispatch(mediaplanDeleteAds(idAds, idMediaplan, e.target.value))
  }, [dispatch, idMediaplan])

  const currentMediaplan = useSelector(state => state.mediaplanReducer.currentMediaplan)

  const loading = useSelector(state => state.mediaplanReducer.preloader)
  const banners = useSelector(state => {
    if (!state.mediaplanReducer.currentMediaplan.MediaplanBanner || 
        state.mediaplanReducer.currentMediaplan.MediaplanBanner.length === 0)
      return <span>Баннеры отсутствуют</span>
    const rawBanners = state.mediaplanReducer.currentMediaplan.MediaplanBanner

    const arrayBannersRaw = [] 
    rawBanners.map(item => {
      for (let i = 0; i < item.banner_in_mediaplan.position.length; i++)
      {
        arrayBannersRaw[item.banner_in_mediaplan.position[i]] = item
      }

      return
    })

    const transformedBanners = arrayBannersRaw.map((banner, index) => {
      if (!banner)
        return false
      return ( 
      <li className="collection-item row" key={index}>
        <div className="col s11">
          <span>{banner.name}</span><br/>
          <span>{banner.online ? "Онлайн" : "Оффлайн"}</span><br/>
          <span>Длительность: {banner.duration}</span><br />
          <span>Позиция: {index}</span>
        </div>
        <button className="btn col s1" value={index} onClick={(e) => deleteBannerHandler(banner.banner_in_mediaplan.id, e)}>
          <i className="material-icons" value={index} style={{marginRight: "10px"}}>delete</i>
        </button>
      </li>
    )})

    return transformedBanners
  })

  const ads = useSelector(state => {
    if (!state.mediaplanReducer.currentMediaplan.MediaplanContent ||
        state.mediaplanReducer.currentMediaplan.MediaplanContent.length === 0)
      return <span>Дополнительный контент отсутствует</span>

    const rawAds = state.mediaplanReducer.currentMediaplan.MediaplanContent
    
    const arrayAdsRaw = [] 
    rawAds.map(item => {
      for (let i = 0; i < item.ads.position.length; i++)
      {
        arrayAdsRaw[item.ads.position[i]] = item
      }

      return
    })

    const transformedAds = arrayAdsRaw.map((ad, index) => {
      if (!ad)
        return false
      return ( 
      <li className="collection-item row" key={index}>
        <div className="col s11">
          <span>{ad.name}</span><br/>
          <span>{ad.online ? "Онлайн" : "Оффлайн"}</span><br/>
          <span>Длительность: {ad.duration}</span><br />
          <span>Позиция: {index}</span>
        </div>
        <button className="btn col s1" value={index} onClick={(e) => deleteAdsHandler(ad.ads.id, e)}>
          <i className="material-icons" style={{marginRight: "10px"}}>delete</i>
        </button>
      </li>
    )})

    return transformedAds
  })


  const editOptionsHandler = useCallback( () => {
    dispatch(mediaplanSetEditOptionsForm("id", currentMediaplan.id))
    dispatch(mediaplanSetEditOptionsForm("ads_start_delay", currentMediaplan.ads_start_delay))
    dispatch(mediaplanSetEditOptionsForm("banners_start_delay", currentMediaplan.banners_start_delay))
    dispatch(mediaplanSetEditOptionsForm("banners_repeat", currentMediaplan.banners_repeat))
    dispatch(mediaplanSetEditOptionsForm("banners_animation_duration_msec", currentMediaplan.banners_animation_duration_msec))
    setShowModalOptions(true)
  }, [
    dispatch, 
    currentMediaplan.id, 
    currentMediaplan.ads_start_delay, 
    currentMediaplan.banners_start_delay, 
    currentMediaplan.banners_repeat,
    currentMediaplan.banners_animation_duration_msec,
    setShowModalOptions
  ])
  
  const editContentHandler = useCallback( () => {
    dispatch(mediaplanGetContentList())
    setShowModalContent(true)
  }, [dispatch, setShowModalContent])
  
  const editTickerHandler = useCallback( () => {
    dispatch(mediaplanGetTickerList())
    setShowModalTicker(true)
  }, [dispatch, setShowModalTicker])
  
  const editBannerHandler = useCallback( () => {
    dispatch(mediaplanGetBannerList())
    setShowModalBanner(true)
  }, [dispatch, setShowModalBanner])
  
  const editAdsHandler = useCallback( () => {
    dispatch(mediaplanGetAdsList())
    setShowModalAds(true)
  }, [dispatch, setShowModalAds])
  
  
  const initializeHandler = useCallback( () => {
    const path = window.location.href.split('/')
    const id = path[path.length - 1]
    dispatch(mediaplanSetCurrent(id))
    dispatch(mediaplanLoadMediaplan(id))
  }, [dispatch])

  useEffect(() => { initializeHandler() }, [initializeHandler])
  

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
        <button 
          className="btn" 
          style={{marginTop: "0"}}
          onClick={editBannerHandler}
        >Добавить баннер</button>
        <div style={{overflowY: "scroll"}}>
          <ul className="collection">
            {banners}
          </ul>
        </div>

        <EditBannersMediaplan
          show={showModalBanner}
          onCreate={() => {
            setShowModalBanner(false)
          }}
          onClose={() => {
            setShowModalBanner(false)
          }}
        />

      </div>
      }
      
      {tab4 &&
      <div className="col s9 offset-s3">
        <button 
          className="btn" 
          style={{marginTop: "0"}}
          onClick={editTickerHandler}
        >Выбрать бегущую строку</button>
        <div>
          <ul className="collection">
            <li className="collection-item">Бегущая строка: {currentMediaplan.ticker ? currentMediaplan.ticker.name : "Не определено"}</li>
          </ul>
        </div>

        <EditTickerMediaplan
          show={showModalTicker}
          onCreate={() => {
            setShowModalTicker(false)
          }}
          onClose={() => {
            setShowModalTicker(false)
          }}
          name={currentMediaplan.ticker ? currentMediaplan.ticker.name : undefined}
        />

      </div>
      }
      
      {tab5 &&
      <div className="col s9 offset-s3">
        <button 
          className="btn" 
          style={{marginTop: "0"}}
          onClick={editAdsHandler}
        >Добавить дополнительный контент</button>
        <div style={{overflowY: "scroll"}}>
          <ul className="collection">
            {ads}
          </ul>
        </div>

        <EditAdsMediaplan
          show={showModalAds}
          onCreate={() => {
            setShowModalAds(false)
          }}
          onClose={() => {
            setShowModalAds(false)
          }}
        />

      </div>
      }

    </div>
  )
}