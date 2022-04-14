import React, { useCallback, useEffect, useState } from "react";
import { Preloader } from "../../components/Preloader";
import { useDispatch, useSelector } from 'react-redux';
import { MediaplanCard } from "./MediaplanCard";
import { AddMediaplan } from "./AddMediaplan";
import { mediaplanLoadMediaplans, mediaplanSetSucceed, mediaplanGetContentList } from "../../store/actionCreators/mediaplanActionCreator";

export const MediaplansPage = () => {
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)

  const loading = useSelector(state => state.mediaplanReducer.preloader)
  const mediaplans = useSelector(state => {
    const mediaplansRaw = state.mediaplanReducer.mediaplans

    console.log("Mediaplans", mediaplansRaw);

    const mediaplans = mediaplansRaw.map(m => 
      <MediaplanCard 
        id={m.id} 
        key={m.id} 
        name={m.name}
        ads_start_delay={m.ads_start_delay} 
        banners_start_delay={m.banners_start_delay} 
        banners_repeat={m.banners_repeat} 
        banners_animation_duration_msec={m.banners_animation_duration_msec} 
        content={m.common_content} 
        ticker={m.ticker} 
        MediaplanBanner={m.MediaplanBanner} 
        MediaplanContent={m.MediaplanContent} 
      />
    )

    return mediaplans
  })

  const initializeHandler = useCallback( () => {
    dispatch(mediaplanGetContentList())
    dispatch(mediaplanLoadMediaplans())
    dispatch(mediaplanSetSucceed(false))
  }, [dispatch])

  useEffect(() => { initializeHandler() }, [initializeHandler])

  return (
    <div>
      <h1>Медиапланы</h1>

      {loading && <Preloader />}

      {!loading && 
        <div>

          <button 
            key="new" 
            className="waves-effect waves-light btn" 
            style={{display: "flex", width: '130px'}}
            onClick={ () => setShowModal(true)}
          >
            <i className="material-icons">add</i>
            <span>Добавить</span>
          </button>
    
          <AddMediaplan 
            show={showModal} 
            onCreate={() => {
              setShowModal(false)
            }}
            onClose={() => {
              setShowModal(false)
            }}
          />

          <div className="collection" style={{border: "0px"}}>
            { mediaplans }
          </div>

        </div>
      }

    </div>
  )
}