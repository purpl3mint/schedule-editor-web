import './MediaplanEditor.css'
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
        className="col s12 element elementContent"
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
        className="col s12 element elementBanner"
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
        className="col s12 element elementTicker"
        key={"ticker" + item.id} 
        onClick={chooseTickerHandler}
        >{item.name}
      </li>)

    return tickerTransformed
  })

  return (
    <div className="col s4 elements">

          <div className="row elementsTitle">
            <div className="col s4 elementsTitleItem">
              <span 
                className="btn elementsTitleItemToggle"
                onClick={() => {setShowTabContent(true); setShowTabBanners(false); setShowTabTickers(false)}}
              >
                Контент
              </span>
            </div>
            <div className="col s4 elementsTitleItem">
              <span 
                className="btn elementsTitleItemToggle"
                onClick={() => {setShowTabContent(false); setShowTabBanners(true); setShowTabTickers(false)}}
              >
                Баннеры
              </span>
            </div>
            <div className="col s4 elementsTitleItem">
              <span 
                className="btn elementsTitleItemToggle"
                onClick={() => {setShowTabContent(false); setShowTabBanners(false); setShowTabTickers(true)}}
              >
                Бег. строки
              </span>
            </div>
          </div>

          <ul className="row elementsList" >
            {showTabContent && contentList}
            {showTabBanners && bannerList}
            {showTabTickers && tickerList}
          </ul>

          <button 
            className={
              contentChanged || bannersChanged || tickerChanged 
              ? "btn elementsListSaveChanges" 
              : "btn disabled elementsListSaveChanges"
            } 
            onClick={saveTimeline}

          >Сохранить изменения таймлайна</button>

        </div>
  )
}