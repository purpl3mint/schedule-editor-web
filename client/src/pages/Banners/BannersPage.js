import React, { useCallback, useEffect, useState } from "react";
import { Preloader } from "../../components/Preloader";
import { useDispatch, useSelector } from 'react-redux';
import { BannerCard } from "./BannerCard";
import { bannerLoadBanners, bannerSetSucceed } from "../../store/actionCreators/bannerActionCreator";
import { AddBanner } from "./AddBanner";

export const BannersPage = () => {
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)

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

          <AddBanner
            show={showModal} 
            onCreate={() => {
              setShowModal(false)
              window.location.reload()
            }}
            onClose={() => {
              setShowModal(false)
            }}
          />

          <div className="collection" style={{border: "0px"}}>
            { banners }
          </div>
          
        </div>
      }

    </div>
  )
}