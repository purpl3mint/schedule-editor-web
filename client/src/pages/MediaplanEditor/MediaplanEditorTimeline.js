import './MediaplanEditor.css'
import React from "react"

export const MediaplanEditorTimeline = (props) => {
  const {
    contents,
    banners,
    chosenTicker
  } = props

  console.log("Banners: ", banners);

  console.log("Chosen ticker:", chosenTicker);
  
  return (
    <div className="row timelineContainer">
      <div className="col s1 timelineTags">

        <div className="row timelineTagContainer">
          <div className="col timelineTag timelineTagContent">
            <span className='timelineTagText'>Контент</span>
          </div>
        </div>

        <div className="row timelineTagContainer">
          <div className="col timelineTag timelineTagBanner">
            <span className='timelineTagText'>Баннеры</span>
          </div>
        </div>

        <div className="row timelineTagContainer">
          <div className="col timelineTag timelineTagTicker">
            <span className='timelineTagText'>Бегущая строка</span>
          </div>
        </div>
      </div>

      <div className="col s11 timeline">

        <div className="row timelineContents">
          {contents}
        </div>

        <div className="row timelineBanners">
          {banners}
        </div>

        <div className="row timelineTicker">
          {chosenTicker}
        </div>
      </div>
    </div>
  )
}