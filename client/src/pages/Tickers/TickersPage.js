import React, { useCallback, useEffect } from "react";
import { Preloader } from "../../components/Preloader";
import { useDispatch, useSelector } from 'react-redux';
import { TickerCard } from "./TickerCard";
import { tickerLoadTickers, tickerSetSucceed } from "../../store/actionCreators/tickerActionCreator";

export const TickersPage = () => {
  const dispatch = useDispatch()

  const loading = useSelector(state => state.userReducer.preloader)
  const tickers = useSelector(state => {
    const tickersRaw = state.tickerReducer.tickers
    const tickers = tickersRaw.map(t => 
      <TickerCard 
        id={t.id} 
        key={t.id} 
        name={t.name} 
        url={t.url} 
        size={t.size} 
        speed={t.speed} 
        font_color={t.font_color} 
        background_color={t.background_color} 
      />
    )

    return tickers
  })

  const initializeHandler = useCallback( () => {
    dispatch(tickerLoadTickers())
    dispatch(tickerSetSucceed(false))
  }, [dispatch])

  useEffect(() => { initializeHandler() }, [initializeHandler])

  return (
    <div>
      <h1>Бегущие строки</h1>

      {loading && <Preloader />}

      {!loading && 
        <div className="collection" style={{border: "0px"}}>
          { tickers }
        </div>
      }

    </div>
  )
}