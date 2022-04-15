import './MediaplanEditor.css'
import React, {useCallback, useEffect, useState} from "react"
import { useDispatch, useSelector } from 'react-redux';
import { useMessage } from '../../hooks/message.hook';
import { 
  mediaplanGetBannerList, 
  mediaplanGetContentList, 
  mediaplanGetTickerList, 
  mediaplanSetCurrent, 
  mediaplanLoadMediaplan,
  mediaplanSetEditTickerForm,
  mediaplanEditTicker,
  mediaplanDeleteTicker,
  mediaplanPutTimelineBanner,
  mediaplanPutTimelineContent,
  mediaplanResetTimelineBanner,
  mediaplanResetTimelineContent,
  mediaplanSetNewBannersList,
  mediaplanSetNewContentList
} from "../../store/actionCreators/mediaplanActionCreator";
import { MediaplanEditorElements } from "./MediaplanEditorElements";
import { MediaplanEditorOptions } from "./MediaplanEditorOptions";
import { MediaplanEditorTimeline } from "./MediaplanEditorTimeline";

export const MediaplanEditor = (props) =>
{
  const dispatch = useDispatch();
  const message = useMessage();

  //Mediaplan id
  const id = useSelector(state => state.mediaplanReducer.currentMediaplan.id);
  
  //Raw data with elements of mediaplan
  const formTicker = useSelector(state => state.mediaplanReducer.editTickerForm);
  const currentMediaplan = useSelector(state => state.mediaplanReducer.currentMediaplan);
  const contentTimelineList = useSelector(state => state.mediaplanReducer.contentTimelineList);
  const bannerTimelineList = useSelector(state => state.mediaplanReducer.bannerTimelineList);

  //Flags for changing timeline
  const [contentChanged, setContentChanged] = useState(false);
  const [bannersChanged, setBannersChanged] = useState(false);
  const [tickerChanged, setTickerChanged] = useState(false);

  //Container and handlers for current ticker
  const chooseTickerHandler = useCallback( (e) => {
    setTickerChanged(true)
    dispatch(mediaplanSetEditTickerForm("tickerId", e.target.value))
    message("Бегущая строка добавлена в список (не сохранено)")
  }, [dispatch, setTickerChanged])

  const clearTickerHandler = useCallback( () => {
    setTickerChanged(true)
    dispatch(mediaplanSetEditTickerForm("tickerId", 0))
    message("Бегущая строка удалена из списка (не сохранено)")
  }, [dispatch, setTickerChanged])

  const saveTickerHandler = useCallback( () => {
    if (formTicker.tickerId !== 0){
      dispatch(mediaplanEditTicker(formTicker, id))
    } else {
      dispatch(mediaplanDeleteTicker(id))
    }
    message("Бегущая строка успешно сохранена")
  }, [dispatch, formTicker, id, message])

  const chosenTicker = useSelector( state => {
    const tickerId = state.mediaplanReducer.editTickerForm.tickerId
    const tickerList = state.mediaplanReducer.tickerList

    const tickerFound = tickerList.find(item => item.id === tickerId)

    if (tickerFound) {
      return (
        <div 
          className="col items itemTicker" 
          id={tickerFound.id}
        >
          <p>{tickerFound.name}</p>
          <button className="btn itemTickerClearBtn" onClick={clearTickerHandler}>
            <i className="material-icons">delete</i>
          </button>
        </div>
      )
    } else {
      return (
        <div className="col items itemTickerEmpty"></div>
      )
    }
  })

  //Container and handlers for banners
  const chooseBannerHandler = useCallback((e) => {
    setBannersChanged(true)
    dispatch(mediaplanPutTimelineBanner(e.target.value, bannerTimelineList.length))
    message("Баннер добавлен в список (не сохранено)")
  }, [dispatch, bannerTimelineList, setBannersChanged])

  const removeBannerHandler = useCallback((e) => {
    setBannersChanged(true)

    let position
    if (e.target.localName === "button")
      position = e.target.value
    else if (e.target.localName === "i")
      position = e.target.parentNode.value

    if (position)
    {
      const newBannerTimelineList = bannerTimelineList.filter((bannerId, index) => index !== (position - 0))
      dispatch(mediaplanResetTimelineBanner(newBannerTimelineList))

      message("Баннер удален из списка (не сохранено)")
    }
  }, [dispatch, bannerTimelineList, setBannersChanged])

  const saveBannersHandler = useCallback((e) => {
    dispatch(mediaplanSetNewBannersList(bannerTimelineList, id))
    message("Баннеры успешно сохранены")
  }, [dispatch, bannerTimelineList, id])

  const banners = useSelector( state => {
    const widthBlock = 30;
    const bannerTimelineList = state.mediaplanReducer.bannerTimelineList
    const bannerList = state.mediaplanReducer.bannerList

    const arrayBannersRaw = []
    bannerTimelineList.forEach((bannerId, index) => {
      if (bannerId !== undefined)
        arrayBannersRaw[index] = bannerList.find(banner => banner.id === bannerId)
    })
    
    const bannersTransformed = arrayBannersRaw.map((item, index) => {
      const offsetWidth = widthBlock * (index)

      const secNumber = Math.floor(item.duration % 60)
      const sec = `${secNumber / 10}${secNumber % 10}`

      const minNumber = Math.floor(item.duration / 60)
      const min = `${minNumber / 10}${minNumber % 10}`

      const hour = Math.floor(item.duration / 3600)

      return (
        <div 
          className="col items itemBanners" 
          key={"bannerTimeline" + index}
          value={item.id}
          style={{
            left: `${offsetWidth}%`, 
            width: `${widthBlock}%`
          }}
        >
          <p>{item.name}</p>
          <p>Длительность: {`${hour}:${min}:${sec}`}</p>
          <button 
            value={index}
            className="btn itemBannersClearBtn"
            onClick={removeBannerHandler}
          >
            <i className="material-icons" value={index}>delete</i>
          </button>
        </div>
      )
    })

    return bannersTransformed
  })


  //Container and handlers for content
  const chooseContentHandler = useCallback((e) => {
    setContentChanged(true)
    dispatch(mediaplanPutTimelineContent(e.target.value, contentTimelineList.length))
    message("Контент добавлен в список (не сохранено)")
  }, [dispatch, contentTimelineList, setContentChanged])

  const removeContentHandler = useCallback((e) => {
    setContentChanged(true)

    let position
    if (e.target.localName === "button")
      position = e.target.value
    else if (e.target.localName === "i")
      position = e.target.parentNode.value

    if (position !== undefined)
    {
      const newContentTimelineList = contentTimelineList.filter((contentId, index) => index !== (position - 0))
      dispatch(mediaplanResetTimelineContent(newContentTimelineList))
      message("Контент удален из списка (не сохранено)")
    }
  }, [dispatch, contentTimelineList, setContentChanged])

  const saveContentHandler = useCallback((e) => {
    dispatch(mediaplanSetNewContentList(contentTimelineList, id))
    message("Контент успешно сохранен")
  }, [dispatch, contentTimelineList, id])

  const contents = useSelector( state => {
    const widthBlock = 30;
    const contentTimelineList = state.mediaplanReducer.contentTimelineList
    const contentList = state.mediaplanReducer.contentList

    const arrayAdsRaw = [] 
    contentTimelineList.forEach((contentId, index) => {
      if (contentId !== undefined)
        arrayAdsRaw[index] = contentList.find(content => content.id === contentId)
    })
    
    const contentTransformed = arrayAdsRaw.map((item, index) => {
      const offsetWidth = widthBlock * index
      
      const secNumber = Math.floor(item.duration % 60)
      const sec = `${secNumber / 10}${secNumber % 10}`

      const minNumber = Math.floor(item.duration / 60)
      const min = `${minNumber / 10}${minNumber % 10}`

      const hour = Math.floor(item.duration / 3600)

      return (
        <div 
          className="col items itemContent" 
          key={"contentTimeline" + index}
          value={item.id}
          style={{
            left: `${offsetWidth}%`,
            width: `${widthBlock}%`
          }}
        >
          <p>{item.name}</p>
          <p>Длительность: {`${hour}:${min}:${sec}`}</p>
          <button 
            className="btn itemContentClearBtn"
            value={index}
            onClick={removeContentHandler}
          >
            <i className="material-icons">delete</i>
          </button>
        </div>
      )
    })

    return contentTransformed
  })

  //Save timeline changes
  const saveTimeline = useCallback((e) => {
    if (tickerChanged) {
      saveTickerHandler()
      setTickerChanged(false)
    }
    if (bannersChanged) {
      saveBannersHandler()
      setBannersChanged(false)
    }
    if (contentChanged) {
      saveContentHandler()
      setContentChanged(false)
    }
    
  }, [tickerChanged, setTickerChanged, saveTickerHandler,
      bannersChanged, setBannersChanged, saveBannersHandler,
      contentChanged, setContentChanged, saveContentHandler])

  //Initializing data
  const setupTicker = useCallback( () => {
    dispatch(mediaplanSetEditTickerForm("mediaplanId", currentMediaplan.id))
    if (currentMediaplan.ticker) {
      dispatch(mediaplanSetEditTickerForm("tickerId", currentMediaplan.ticker.id))
    } else {
      dispatch(mediaplanSetEditTickerForm("tickerId", null))
    }
  }, [dispatch, currentMediaplan])

  const setupBanners = useCallback( () => {
    const bannerArray = []
    for(let i = 0; i < currentMediaplan.MediaplanBanner.length; i++) 
    {
      const currentBanner = currentMediaplan.MediaplanBanner[i].banner_in_mediaplan;
      for (let j = 0; j < currentBanner.position.length; j++)
        bannerArray[currentBanner.position[j]] = currentBanner.bannerId
    }
    dispatch(mediaplanResetTimelineBanner(bannerArray))
  }, [dispatch, currentMediaplan])

  const setupContents = useCallback( () => {
    const contentArray = []
    contentArray[0] = currentMediaplan.common_content.id

    for(let i = 0; i < currentMediaplan.MediaplanContent.length; i++)
    {
      const currentContent = currentMediaplan.MediaplanContent[i].ads;
      for (let j = 0; j < currentContent.position.length; j++)
        contentArray[currentContent.position[j]] = currentContent.contentId
    }
    dispatch(mediaplanResetTimelineContent(contentArray))
  }, [dispatch, currentMediaplan])

  const initializeHandler = useCallback( () => {
    //Get all components for mediaplan
    dispatch(mediaplanGetContentList())
    dispatch(mediaplanGetTickerList())
    dispatch(mediaplanGetBannerList())

    //Get mediaplan using data from url
    const path = window.location.href.split('/')
    const id = path[path.length - 1]
    
    dispatch(mediaplanSetCurrent(id))
    dispatch(mediaplanLoadMediaplan(id))
  }, [dispatch])

  useEffect(() => { initializeHandler() }, [initializeHandler])
  useEffect(() => { setupTicker() }, [setupTicker])
  useEffect(() => { setupBanners() }, [setupBanners])
  useEffect(() => { setupContents() }, [setupContents])


  return (
    <div>
      <div className="row mediaplanEditorContainer">

        <MediaplanEditorElements 
          chooseContentHandler={chooseContentHandler}
          chooseBannerHandler={chooseBannerHandler}
          chooseTickerHandler={chooseTickerHandler}
          contentChanged={contentChanged}
          bannersChanged={bannersChanged}
          tickerChanged={tickerChanged}
          saveTimeline={saveTimeline}
        />

        <MediaplanEditorOptions
          name={currentMediaplan.name}
          mediaplanId={id}
          ads_start_delay={currentMediaplan.ads_start_delay}
          banners_start_delay={currentMediaplan.banners_start_delay}
          banners_repeat={currentMediaplan.banners_repeat}
          banners_animation_duration_msec={currentMediaplan.banners_animation_duration_msec}
        />
      </div>

      <MediaplanEditorTimeline
        contents={contents}
        banners={banners}
        chosenTicker={chosenTicker}
      />

    </div>
  )
}