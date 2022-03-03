import React, { useCallback, useEffect } from "react";
import { Preloader } from "../../components/Preloader";
import { useDispatch, useSelector } from 'react-redux';
import { MediaplanCard } from "./MediaplanCard";
import { mediaplanLoadMediaplans, mediaplanSetSucceed } from "../../store/actionCreators/mediaplanActionCreator";

export const MediaplansPage = () => {
  const dispatch = useDispatch()

  const loading = useSelector(state => state.mediaplanReducer.preloader)
  const mediaplans = useSelector(state => {
    const mediaplansRaw = state.mediaplanReducer.mediaplans
    const mediaplans = mediaplansRaw.map(m => 
      <MediaplanCard 
        id={m.id} 
        key={m.id} 
        name={m.name}
        ads_start_delay={m.ads_start_delay} 
        banners_start_delay={m.banners_start_delay} 
        banners_repeat={m.banners_repeat} 
        banners_animation_duration_msec={m.banners_animation_duration_msec} 
        commonContentId={m.commonContentId} 
        tickerId={m.tickerId} 
        MediaplanBanner={m.MediaplanBanner} 
        MediaplanContent={m.MediaplanContent} 
      />
    )

    return mediaplans
  })

  const initializeHandler = useCallback( () => {
    dispatch(mediaplanLoadMediaplans())
    dispatch(mediaplanSetSucceed(false))
  }, [dispatch])

  useEffect(() => { initializeHandler() }, [initializeHandler])

  return (
    <div>
      <h1>Медиапланы</h1>

      {loading && <Preloader />}

      {!loading && 
        <div className="collection" style={{border: "0px"}}>
          { mediaplans }
        </div>
      }

    </div>
  )
}