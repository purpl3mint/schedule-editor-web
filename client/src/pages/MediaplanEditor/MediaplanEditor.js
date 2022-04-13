import React, {useCallback, useEffect, useState} from "react"
import { useDispatch, useSelector } from 'react-redux';
import { useMessage } from '../../hooks/message.hook';
import { 
  mediaplanGetBannerList, 
  mediaplanGetContentList, 
  mediaplanGetTickerList, 
  mediaplanSetCurrent, 
  mediaplanLoadMediaplan,
  mediaplanSetEditOptionsForm ,
  mediaplanEditOptions,
  mediaplanSetEditTickerForm,
  mediaplanEditTicker,
  mediaplanDeleteTicker
} from "../../store/actionCreators/mediaplanActionCreator";

export const MediaplanEditor = (props) =>
{
  const dispatch = useDispatch();
  const message = useMessage();

  const id = useSelector(state => state.mediaplanReducer.currentMediaplan.id);
  const formOptions = useSelector(state => state.mediaplanReducer.editOptionsForm);
  const formTicker = useSelector(state => state.mediaplanReducer.editTickerForm);
  const currentMediaplan = useSelector(state => state.mediaplanReducer.currentMediaplan);

  //Tab togglers for components lists
  const [showTabContent, setShowTabContent] = useState(true);
  const [showTabBanners, setShowTabBanners] = useState(false);
  const [showTabTickers, setShowTabTickers] = useState(false);

  //Container and handlers for current ticker
  const chooseTickerHandler = useCallback( (e) => {
    dispatch(mediaplanSetEditTickerForm("tickerId", e.target.value))
  }, [dispatch])

  const clearTickerHandler = useCallback( () => {
    dispatch(mediaplanSetEditTickerForm("tickerId", 0))
  }, [dispatch])

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
  const banners = useSelector( state => {
    const widthBlock = 30;
    const bannersRaw = state.mediaplanReducer.currentMediaplan.MediaplanBanner

    const bannersTransformed = bannersRaw.map((item, index) => {
      const offset = widthBlock * index
      const sec = Math.floor(item.duration % 60)
      const min = Math.floor(item.duration / 60)
      const hour = Math.floor(item.duration / 3600)

      return (
        <div 
          className="col items itemBanners" 
          key={item.id}
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
            className="btn"
            style={{
              position: "absolute",
              top: "40px",
              right: "10px"
            }}
          >
            <i className="material-icons">delete</i>
          </button>
          <button 
            className="btn"
            style={{
              position: "absolute",
              top: "40px",
              right: "70px"
            }}
          >
            <i className="material-icons">edit</i>
          </button>
        </div>
      )
    })

    return bannersTransformed
  })

  //Container and handlers for content
  const contents = useSelector( state => {
    const widthBlock = 30;
    const commonContent = [state.mediaplanReducer.currentMediaplan.common_content];
    const ads = state.mediaplanReducer.currentMediaplan.MediaplanContent;
    const contentRaw = commonContent.concat(ads)


    const contentTransformed = contentRaw.map((item, index) => {
      const offset = widthBlock * index
      const sec = Math.floor(item.duration % 60)
      const min = Math.floor(item.duration / 60)
      const hour = Math.floor(item.duration / 3600)

      return (
        <div 
          className="col items itemContent" 
          key={item.id}
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
            style={{
              position: "absolute",
              top: "40px",
              right: "10px"
            }}
          >
            <i className="material-icons">delete</i>
          </button>
          <button 
            className="btn"
            style={{
              position: "absolute",
              top: "40px",
              right: "70px"
            }}
          >
            <i className="material-icons">edit</i>
          </button>
        </div>
      )
    })

    return contentTransformed
  })

  //Plugs for onClick
  const changeHandler = useCallback( (e) => {

  }, [])

  //End of plugs

  const changeOptionsHandler = useCallback( (e) => {
    dispatch(mediaplanSetEditOptionsForm(e.target.name, e.target.value))
}, [dispatch])


  const saveOptionsHandler = useCallback( () => {
    if (formOptions.ads_start_delay < 0) {
      message("Ошибка: задержка воспроизведения основного контента указана неверно")
      return
    }

    if (formOptions.banners_start_delay < 0) {
      message("Ошибка: задержка воспроизведения баннеров указана неверно")
      return
    }

    if (formOptions.banners_animation_duration_msec < 0) {
      message("Ошибка: длительность анимации баннеров указана неверно")
      return
    }

    dispatch(mediaplanEditOptions(formOptions, id))

    message("Основные параметры медиаплана сохранены")
  }, [dispatch, formOptions, props, message, id])


  const contentList = useSelector(state => {
    const contentRaw = state.mediaplanReducer.contentList

    const contentTransformed = contentRaw.map(item => 
      <li 
        value={item.id} 
        className="col s12 element" 
        style={{border: "1px solid black", minHeight: "50px", backgroundColor: "rgba(255, 0, 0, 0.3)"}}
        key={item.id} 
        onClick={changeHandler}
      >
        {item.name}
      </li>)

    return contentTransformed
  });

  const bannerList = useSelector(state => {
    const bannerRaw = state.mediaplanReducer.bannerList

    const bannerTransformed = bannerRaw.map(item => 
      <li 
        value={item.id} 
        className="col s12 element" 
        style={{border: "1px solid black", minHeight: "50px", backgroundColor: "rgba(0, 255, 0, 0.3)"}}
        key={item.id} 
        onClick={changeHandler}
      >
        {item.name}
      </li>
    )

    return bannerTransformed
  })

  const tickerList = useSelector(state => {
    const tickerRaw = state.mediaplanReducer.tickerList

    const tickerTransformed = tickerRaw.map(item => 
      <li 
        value={item.id} 
        className="col s12 element" 
        style={{border: "1px solid black", minHeight: "50px", backgroundColor: "rgba(0, 0, 255, 0.3)"}}
        key={item.id} 
        onClick={chooseTickerHandler}
        >{item.name}
      </li>)

    return tickerTransformed
  })

  const initializeHandler = useCallback( () => {
    //Get all possible components for mediaplan
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

  //Setup options form
  useEffect(() => {
    dispatch(mediaplanSetEditOptionsForm("id", currentMediaplan.id))
    dispatch(mediaplanSetEditOptionsForm("ads_start_delay", currentMediaplan.ads_start_delay))
    dispatch(mediaplanSetEditOptionsForm("banners_start_delay", currentMediaplan.banners_start_delay))
    dispatch(mediaplanSetEditOptionsForm("banners_repeat", currentMediaplan.banners_repeat))
    dispatch(mediaplanSetEditOptionsForm("banners_animation_duration_msec", currentMediaplan.banners_animation_duration_msec))
  }, [dispatch, currentMediaplan])
  
  //Setup ticker form
  useEffect(() => {
    dispatch(mediaplanSetEditTickerForm("mediaplanId", currentMediaplan.id))
    if (currentMediaplan.ticker) {
      dispatch(mediaplanSetEditTickerForm("tickerId", currentMediaplan.ticker.id))
    } else {
      dispatch(mediaplanSetEditTickerForm("tickerId", null))
    }
  }, [dispatch, currentMediaplan])


  return (
    <div>
      <div className="row" style={{marginTop: "30px"}}>
        <div className="col s4 elements" style={{height: "400px"}}>

          <div className="row elementsTitle" style={{height: "48px", paddingTop: "5px", marginBottom: "0px"}}>
            <div className="col s4 elementsTitleItem">
              <span 
                className="btn" 
                style={{width: "100%", height: "100%"}}
                onClick={() => {setShowTabContent(true); setShowTabBanners(false); setShowTabTickers(false)}}
              >
                Контент
              </span>
            </div>
            <div className="col s4 elementsTitleItem">
              <span 
                className="btn" 
                style={{width: "100%", height: "100%"}}
                onClick={() => {setShowTabContent(false); setShowTabBanners(true); setShowTabTickers(false)}}
              >
                Баннеры
              </span>
            </div>
            <div className="col s4 elementsTitleItem">
              <span 
                className="btn" 
                style={{width: "100%", height: "100%"}}
                onClick={() => {setShowTabContent(false); setShowTabBanners(false); setShowTabTickers(true)}}
              >
                Бег. строки
              </span>
            </div>
          </div>

          <ul className="row elementsList" style={{height: "300px", border: "1px solid black" ,marginBottom: "10px", marginTop: "0px", overflowY: "scroll"}}>
            {showTabContent && contentList}
            {showTabBanners && bannerList}
            {showTabTickers && tickerList}
          </ul>

          <button className="btn" style={{width: "100%"}} onClick={saveTickerHandler}>Сохранить изменения таймлайна</button>

        </div>


        <div className="col offset-s1 s4 options" style={{height: "400px", border: "1px solid black", overflowY: "scroll"}}>
          <p>Название медиаплана: <span>{currentMediaplan.name || "без названия"}</span></p>

          <div className="row">
            <div className="input-field col s6">
              <input value={formOptions.ads_start_delay} id="ads_start_delay" name="ads_start_delay" type="number" onChange={changeOptionsHandler}/>
              <span className="helper-text">Задержка воспроизведения доп контента</span>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input value={formOptions.banners_start_delay} id="banners_start_delay" name="banners_start_delay" type="number" onChange={changeOptionsHandler}/>
              <span className="helper-text">Задержка воспроизведения баннеров</span>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input value={formOptions.banners_animation_duration_msec} id="banners_animation_duration_msec" name="banners_animation_duration_msec" type="number" onChange={changeOptionsHandler}/>
              <span className="helper-text">Длительность воспроизведения анимации баннеров</span>
            </div>
          </div>

          <div className="row">
            <select defaultValue={formOptions.banners_repeat} className="col s6 browser-default" name="banners_repeat" onChange={changeOptionsHandler}>
              <option value="-1" disabled>Осуществлять повтор баннеров?</option>
              <option value="false">Не повторять баннеры</option>
              <option value="true">Повторять баннеры</option>
            </select>
          </div>

          <button className="btn" onClick={saveOptionsHandler}>Сохранить</button>
        </div>
      </div>

      <div className="row timelineContainer" style={{marginBottom: "0px"}}>
        <div className="col s1 tags" style={{height: "300px", border: "1px solid black"}}>

          <div className="row tagContainer" style={{height: "100px", border: "1px solid black", marginBottom: "0px"}}>
            <div className="col tag" style={{width: "100%", height: "100%" , backgroundColor: "rgba(255, 0, 0, 0.5)"}}>
              <span style={{display: "flex", marginTop: "35px", marginLeft: "20px", marginRight: "20px"}}>Контент</span>
            </div>
          </div>

          <div className="row tagContainer" style={{height: "100px", border: "1px solid black", marginBottom: "0px"}}>
            <div className="col tag" style={{width: "100%", height: "100%" , backgroundColor: "rgba(0, 255, 0, 0.5)"}}>
              <span style={{display: "flex", marginTop: "35px", marginLeft: "20px", marginRight: "20px"}}>Баннеры</span>
            </div>
          </div>

          <div className="row tagContainer" style={{height: "100px", border: "1px solid black", marginBottom: "0px"}}>
            <div className="col tag" style={{width: "100%", height: "100%" , backgroundColor: "rgba(0, 0, 255, 0.5)"}}>
              <span style={{display: "flex", marginTop: "25px", marginLeft: "20px", marginRight: "20px"}}>Бегущая строка</span>
            </div>
          </div>
        </div>

        <div className="col s11 timeline" style={{height: "320px", border: "1px solid black", overflowX: "scroll"}}>

          <div className="row" style={{position: "relative", height: "100px", border: "1px solid black", marginBottom: "0px"}}>
            {contents}
          </div>

          <div className="row" style={{position: "relative", height: "100px", border: "1px solid black", marginBottom: "0px"}}>
            {banners}
          </div>

          <div className="row " style={{position: "fixed", width: "100%", height: "100px", border: "1px solid black", marginBottom: "0px"}}>
            {chosenTicker}
          </div>
        </div>
      </div>
    </div>
  )
}

/*
, width: "175%"

<div className="col items itemContent" style={{position: "absolute", width: "20%", height: "100%", backgroundColor: "rgba(255, 0, 0, 0.3)", borderRight: "1px solid black"}}>
              Content 1
            </div>
            <div className="col items itemContent" style={{position: "absolute", left: "20%", width: "20%", height: "100%", backgroundColor: "rgba(255, 0, 0, 0.3)", borderRight: "1px solid black"}}>
              Content 2
            </div>
            <div className="col items itemContent" style={{position: "absolute", left: "40%", width: "20%", height: "100%", backgroundColor: "rgba(255, 0, 0, 0.3)", borderRight: "1px solid black"}}>
              Content 3
            </div>
            <div className="col items itemContent" style={{position: "absolute", left: "60%", width: "20%", height: "100%", backgroundColor: "rgba(255, 0, 0, 0.3)", borderRight: "1px solid black"}}>
              Content 4
            </div>
            <div className="col items itemContent" style={{position: "absolute", left: "80%", width: "20%", height: "100%", backgroundColor: "rgba(255, 0, 0, 0.3)", borderRight: "1px solid black"}}>
              Content 5
            </div>
*/