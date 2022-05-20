import React, { useCallback, useEffect, useState } from "react";
import { Preloader } from "../../components/Preloader";
import { useDispatch, useSelector } from 'react-redux';
import { UserCard } from "./UserCard";
import { AddUser } from "./AddUser";
import { userLoadUsers, userSetSucceed } from "../../store/actionCreators/userActionCreator";

export const UsersPage = () => {
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)

  const loading = useSelector(state => state.userReducer.preloader)
  const users = useSelector(state => {
    const usersRaw = state.userReducer.users
    const users = usersRaw.map(u => 
      <UserCard username={u.username} type={u.type} id={u.id} key={u.id} />
    )

    return users
  })

  const initializeHandler = useCallback( () => {
    dispatch(userLoadUsers())
    dispatch(userSetSucceed(false))
  }, [dispatch])

  useEffect(() => { initializeHandler() }, [initializeHandler])

  return (
    <div className="col s9">
      <h1>Пользователи</h1>

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
          
          <AddUser 
            show={showModal} 
            onCreate={() => {
              setShowModal(false)
              initializeHandler()
            }}
            onClose={() => {
              setShowModal(false)
            }}
          />

          <div className="collection" style={{border: "0px"}}>
            { users }
          </div>

        </div>
      }

    </div>
  )
}