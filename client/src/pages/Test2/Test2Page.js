import React, { useCallback, useEffect} from "react"
import { useDispatch, useSelector } from 'react-redux'
import { testSetData } from "../../store/actionCreators/testActionCreator"

export const TestPage = () => {
  const dispatch = useDispatch()

  const data = useSelector(state => state.test2Reducer.data)

  return (
    <div>
      <h1>Тестовый компонент 2</h1>
      <div>
        <span className="test-page__data">Данные: {data}</span>
      </div>
    </div>
  )
}