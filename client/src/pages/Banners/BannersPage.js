import React, { useCallback, useEffect } from "react";
import { Preloader } from "../../components/Preloader";
import { useDispatch, useSelector } from 'react-redux';
import { BannerCard } from "./BannerCard";
import { bannerLoadBanners, bannerSetSucceed } from "../../store/actionCreators/bannerActionCreator";

export const BannersPage = () => {
  const dispatch = useDispatch()

  const loading = useSelector(state => state.bannerReducer.preloader)
  const banners = useSelector(state => {
    const bannersRaw = state.bannerReducer.banners
    const banners = bannersRaw.map(b => 
      <BannerCard 
        name={b.name}
        id={b.id}
        key={b.id} 
        url={b.url} 
        url_reserve={b.url_reserve}  
        online={b.online} 
        duration={b.duration} 
        background={b.background} 
        layout_width={b.layout_width} 
        layout_height={b.layout_height} 
        layout_gravity={b.layout_gravity} 
      />
    )

    return banners
  })

  const initializeHandler = useCallback( () => {
    dispatch(bannerLoadBanners())
    dispatch(bannerSetSucceed(false))
  }, [dispatch])

  useEffect(() => { initializeHandler() }, [initializeHandler])

  return (
    <div>
      <h1>Баннеры</h1>

      {loading && <Preloader />}

      {!loading && 
        <div className="collection" style={{border: "0px"}}>
          { banners }
        </div>
      }

    </div>
  )
}