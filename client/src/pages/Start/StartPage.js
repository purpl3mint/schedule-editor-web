import React, { useCallback, useEffect} from "react"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { testUpdateForm, testUpdateData } from "../../store/actionCreators/testActionCreator"

export const StartPage = () => {
  const dispatch = useDispatch()

  const data = useSelector(state => state.testReducer.data)
  const updateForm = useSelector(state => state.testReducer.updateForm)

  const changeHandler = useCallback ( (e) => {
    dispatch(testUpdateForm(e.target.name, e.target.value))
  }, [dispatch])

  const updateHandler = useCallback ( (e) => {
    dispatch(testUpdateData())
  }, [dispatch])

  return (
    <div>
      <h1>Редактор расписаний</h1>
      <div>
        <span className="test-page__data">Данные: {data}</span>
        <input type="text" placeholder="Новые данные" className="test-page__input" name="newData" value={updateForm.newData} onChange={changeHandler} />
        <Link to="/new">
          <button type="button">Создать новое</button>
        </Link>
      </div>
    </div>
  )
}