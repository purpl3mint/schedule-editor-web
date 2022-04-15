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
  }, [dispatch, setTickerChanged])

  const clearTickerHandler = useCallback( () => {
    setTickerChanged(true)
    dispatch(mediaplanSetEditTickerForm("tickerId", 0))
  }, [dispatch, setTickerChanged])

  const saveTickerHandler = useCallback( () => {
    console.log(formTicker);

    if (formTicker.tickerId !== 0){
      dispatch(mediaplanEditTicker(formTicker, id))
      message("Бегущая строка успешно сохранена")
    } else {
      dispatch(mediaplanDeleteTicker(id))
      message("Бегущая строка успешно удалена")
    }
  }, [dispatch, formTicker, id, message])

  const chosenTicker = useSelector( state => {
    const tickerId = state.mediaplanReducer.editTickerForm.tickerId
    const tickerList = state.mediaplanReducer.tickerList

    const result = tickerList.find(item => item.id === tickerId)

    if (result) {
      return (
        <div 
          className="col items itemTicker" 
          id={result.id}
          style={{width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 255, 0.3)"}}
        >
          <p>{result.name}</p>
          <button className="btn" style={{marginTop: "0px"}} onClick={clearTickerHandler}><i className="material-icons">delete</i></button>
        </div>
      )
    } else {
      return (
        <div className="col items itemTicker"></div>
      )
    }
  })

  //Container and handlers for banners
  const chooseBannerHandler = useCallback((e) => {
    setBannersChanged(true)
    dispatch(mediaplanPutTimelineBanner(e.target.value, bannerTimelineList.length))
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
    }
  }, [dispatch, bannerTimelineList, setBannersChanged])

  const saveBannersHandler = useCallback((e) => {
    dispatch(mediaplanSetNewBannersList(bannerTimelineList, id))
  }, [dispatch, bannerTimelineList, id])

  const banners = useSelector( state => {
    const widthBlock = 30;
    const bannerTimelineList = state.mediaplanReducer.bannerTimelineList
    const bannerList = state.mediaplanReducer.bannerList

    const arrayBannersRaw = [] 
    bannerTimelineList.map((bannerId, index) => {
      if (bannerId !== undefined)
        arrayBannersRaw[index] = bannerList.find(banner => banner.id === bannerId)
      return bannerId
    })
    
    const bannersTransformed = arrayBannersRaw.map((item, index) => {
      const offset = widthBlock * (index)
      const sec = Math.floor(item.duration % 60)
      const min = Math.floor(item.duration / 60)
      const hour = Math.floor(item.duration / 3600)

      return (
        <div 
          className="col items itemBanners" 
          key={"bannerTimeline" + index}
          value={item.id}
          style={{
            position: "absolute", 
            left: `${offset}%`, 
            width: `${widthBlock}%`, 
            height: "100%", 
            backgroundColor: "rgba(0, 255, 0, 0.3)", 
            borderRight: "1px solid black"
          }}
        >
          <p>{item.name}</p>
          <p>Длительность: {`${hour/10}${hour%10}:${min/10}${min%10}:${sec/10}${sec%10}`}</p>
          <button 
            value={index}
            className="btn"
            style={{
              position: "absolute",
              top: "40px",
              right: "10px"
            }}
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
    }
  }, [dispatch, contentTimelineList, setContentChanged])

  const saveContentHandler = useCallback((e) => {
    dispatch(mediaplanSetNewContentList(contentTimelineList, id))
  }, [dispatch, contentTimelineList, id])

  const contents = useSelector( state => {
    const widthBlock = 30;
    const contentTimelineList = state.mediaplanReducer.contentTimelineList
    const contentList = state.mediaplanReducer.contentList

    const arrayAdsRaw = [] 
    contentTimelineList.map((contentId, index) => {
      if (contentId !== undefined)
        arrayAdsRaw[index] = contentList.find(content => content.id === contentId)
      return contentId
    })
    
    const contentTransformed = arrayAdsRaw.map((item, index) => {
      const offset = widthBlock * index
      const sec = Math.floor(item.duration % 60)
      const min = Math.floor(item.duration / 60)
      const hour = Math.floor(item.duration / 3600)

      return (
        <div 
          className="col items itemContent" 
          key={"contentTimeline" + index}
          value={item.id}
          style={{
            position: "absolute", 
            left: `${offset}%`,
            width: `${widthBlock}%`, 
            height: "100%", 
            backgroundColor: "rgba(255, 0, 0, 0.3)", 
            borderRight: "1px solid black"
          }}
        >
          <p>{item.name}</p>
          <p>Длительность: {`${hour/10}${hour%10}:${min/10}${min%10}:${sec/10}${sec%10}`}</p>
          <button 
            className="btn"
            value={index}
            style={{
              position: "absolute",
              top: "40px",
              right: "10px"
            }}
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
      <div className="row" style={{marginTop: "30px"}}>

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