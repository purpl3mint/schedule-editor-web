import React from "react"

export const MediaplanEditorTimeline = (props) => {
  const {
    contents,
    banners,
    chosenTicker
  } = props

  return (
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

        <div className="row timelineContents" style={{position: "relative", height: "100px", marginBottom: "0px"}}>
          {contents}
        </div>

        <div className="row timelineBanners" style={{position: "relative", height: "100px", marginBottom: "0px"}}>
          {banners}
        </div>

        <div className="row timelineTicker" style={{position: "fixed", width: "100%", height: "100px", marginBottom: "0px"}}>
          {chosenTicker}
        </div>
      </div>
    </div>
  )
}