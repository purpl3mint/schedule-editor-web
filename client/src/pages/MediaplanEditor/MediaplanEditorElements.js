import React, {useState} from "react"
import { useSelector } from 'react-redux';

export const MediaplanEditorElements = (props) => {
  const {
    chooseContentHandler,
    chooseBannerHandler,
    chooseTickerHandler,
    contentChanged,
    bannersChanged,
    tickerChanged,
    saveTimeline
  } = props

  //Tab togglers for components lists
  const [showTabContent, setShowTabContent] = useState(true);
  const [showTabTickers, setShowTabTickers] = useState(false);
  const [showTabBanners, setShowTabBanners] = useState(false);

  //Lists for tabs
  const contentList = useSelector(state => {
    const contentRaw = state.mediaplanReducer.contentList

    const contentTransformed = contentRaw.map(item => 
      <li 
        value={item.id} 
        className="col s12 element" 
        style={{border: "1px solid black", minHeight: "50px", backgroundColor: "rgba(255, 0, 0, 0.3)"}}
        key={"content" + item.id} 
        onClick={chooseContentHandler}
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
        key={"banner" + item.id} 
        onClick={chooseBannerHandler}
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
        key={"ticker" + item.id} 
        onClick={chooseTickerHandler}
        >{item.name}
      </li>)

    return tickerTransformed
  })

  return (
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

          <button 
            className={contentChanged || bannersChanged || tickerChanged ? "btn" : "btn disabled"} 
            style={{width: "100%"}} 
            onClick={saveTimeline}

          >Сохранить изменения таймлайна</button>

        </div>
  )
}