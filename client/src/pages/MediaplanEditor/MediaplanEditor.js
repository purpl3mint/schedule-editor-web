import React, {useCallback, useEffect, useState} from "react"
import { useDispatch, useSelector } from 'react-redux';
import { useMessage } from '../../hooks/message.hook';
import { mediaplanGetBannerList, mediaplanGetContentList, mediaplanGetTickerList } from "../../store/actionCreators/mediaplanActionCreator";

export const MediaplanEditor = (props) =>
{
  const dispatch = useDispatch();
  const message = useMessage()
  const [showContent, setShowContent] = useState(true);
  const [showBanners, setShowBanners] = useState(false);
  const [showTickers, setShowTickers] = useState(false);

  const changeHandler = useCallback( (e) => {

  }, [])

  const id = useSelector(state => state.mediaplanReducer.currentMediaplan.id);
  const formOptions = useSelector(state => state.mediaplanReducer.editOptionsForm)

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

    console.log(bannerRaw);

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
        onClick={changeHandler}
        >{item.name}
      </li>)

    return tickerTransformed
  })

  const initializeHandler = useCallback( () => {
    dispatch(mediaplanGetContentList())
    dispatch(mediaplanGetTickerList())
    dispatch(mediaplanGetBannerList())
  }, [dispatch])

  useEffect(() => {initializeHandler()}, [initializeHandler])

  return (
    <div>
      <div className="row" style={{marginTop: "30px"}}>
        <div className="col s4 elements" style={{height: "400px"}}>

          <div className="row elementsTitle" style={{height: "48px", paddingTop: "5px", marginBottom: "0px"}}>
            <div className="col s4 elementsTitleItem">
              <span 
                className="btn" 
                style={{width: "100%", height: "100%"}}
                onClick={() => {setShowContent(true); setShowBanners(false); setShowTickers(false)}}
              >
                Контент
              </span>
            </div>
            <div className="col s4 elementsTitleItem">
              <span 
                className="btn" 
                style={{width: "100%", height: "100%"}}
                onClick={() => {setShowContent(false); setShowBanners(true); setShowTickers(false)}}
              >
                Баннеры
              </span>
            </div>
            <div className="col s4 elementsTitleItem">
              <span 
                className="btn" 
                style={{width: "100%", height: "100%"}}
                onClick={() => {setShowContent(false); setShowBanners(false); setShowTickers(true)}}
              >
                Бег. строки
              </span>
            </div>
          </div>

          <ul className="row elementsList" style={{height: "348px", border: "1px solid black" ,marginBottom: "0px", marginTop: "0px", overflowY: "scroll"}}>
            {showContent && contentList}
            {showBanners && bannerList}
            {showTickers && tickerList}
          </ul>

        </div>


        <div className="col offset-s1 s4 settings" style={{height: "400px", border: "1px solid black", overflowY: "scroll"}}>
          <p>Название медиаплана: <span>name</span></p>

          <div className="row">
            <div className="input-field col s6">
              <input value={formOptions.ads_start_delay} id="ads_start_delay" name="ads_start_delay" type="number"/>
              <span className="helper-text">Задержка воспроизведения доп контента</span>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input value={formOptions.banners_start_delay} id="banners_start_delay" name="banners_start_delay" type="number"/>
              <span className="helper-text">Задержка воспроизведения баннеров</span>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input value={formOptions.banners_animation_duration_msec} id="banners_animation_duration_msec" name="banners_animation_duration_msec" type="number"/>
              <span className="helper-text">Длительность воспроизведения анимации баннеров</span>
            </div>
          </div>

          <div className="row">
            <select defaultValue={formOptions.banners_repeat} className="col s6 browser-default" name="banners_repeat">
              <option value="-1" disabled>Осуществлять повтор баннеров?</option>
              <option value="false">Не повторять баннеры</option>
              <option value="true">Повторять баннеры</option>
            </select>
          </div>

          <button className="btn">Сохранить</button>
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

          <div className="row" style={{height: "100px", border: "1px solid black", marginBottom: "0px"}}>
            <div className="col items">

            </div>
          </div>

          <div className="row" style={{height: "100px", border: "1px solid black", marginBottom: "0px"}}>
            <div className="col items">

            </div>
          </div>

          <div className="row" style={{height: "100px", border: "1px solid black", marginBottom: "0px"}}>
            <div className="col items">

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/*
<li className="col s12 element" style={{border: "1px solid black"}}>
              <span className="elementName">Название1</span><br/>
              <span className="elementInfo">youtube</span>
            </li>
            <li className="col s12 element" style={{border: "1px solid black"}}>
              <span className="elementName">Название2</span><br/>
              <span className="elementInfo">youtube</span>
            </li>
            <li className="col s12 element" style={{border: "1px solid black"}}>
              <span className="elementName">Название3</span><br/>
              <span className="elementInfo">youtube</span>
            </li>
*/