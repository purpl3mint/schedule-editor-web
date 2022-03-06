import React, { useCallback, useEffect, useState } from "react";
import { Preloader } from "../../components/Preloader";
import { useDispatch, useSelector } from 'react-redux';
import { contentLoadContents, contentSetSucceed } from "../../store/actionCreators/contentActionCreator"
import { ContentCard } from "./ContentCard";
import { AddContent } from "./AddContent";

export const ContentsPage = () => {
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)

  const loading = useSelector(state => state.contentReducer.preloader)
  const contents = useSelector(state => {
    const contentsRaw = state.contentReducer.contents
    
    const contents = contentsRaw.map(c => 
      <ContentCard 
        name={c.name} 
        url={c.url} 
        online={c.online} 
        aspect_ratio={c.aspect_ratio} 
        duration={c.duration} 
        id={c.id} 
        key={c.id} 
      />
    )

    return contents
  })

  const initializeHandler = useCallback( () => {
    dispatch(contentLoadContents())
    dispatch(contentSetSucceed(false))
  }, [dispatch])

  useEffect(() => { initializeHandler() }, [initializeHandler])

  return (
    <div>
      <h1>Контент</h1>

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

          <AddContent 
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
            { contents }
          </div>
        </div>
      }
    </div>
  )
}