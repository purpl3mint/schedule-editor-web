import React, { useCallback, useEffect, useState } from "react";
import { Preloader } from "../../components/Preloader";
import { useDispatch, useSelector } from 'react-redux';
import { bannerLoadBanners, bannerSetSucceed } from "../../store/actionCreators/bannerActionCreator";
import { BannerCard } from "./BannerCard";
import { AddBanner } from "./AddBanner";
import { EditBanner } from "./EditBanner"

export const BannersPage = () => {
  const dispatch = useDispatch()
  const [showModalAdd, setShowModalAdd] = useState(false)
  const [showModalEdit, setShowModalEdit] = useState(false)
  const [nameEditing, setNameEditing] = useState("")

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
        setShowModalEdit={setShowModalEdit}
        setNameEditing={setNameEditing}
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
            onClick={ () => setShowModalAdd(true)}
          >
            <i className="material-icons">add</i>
            <span>Добавить</span>
          </button>

          <AddBanner
            show={showModalAdd} 
            onCreate={() => {
              setShowModalAdd(false)
              window.location.reload()
            }}
            onClose={() => {
              setShowModalAdd(false)
            }}
          />

          <EditBanner
            nameEditing={nameEditing}
            show={showModalEdit}
            onCreate={() => {
              setShowModalEdit(false)
              window.location.reload()
            }}
            onClose={() => {
              setShowModalEdit(false)
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