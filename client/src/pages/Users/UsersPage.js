import React, { useCallback, useEffect } from "react";
import { Preloader } from "../../components/Preloader";
import { useDispatch, useSelector } from 'react-redux';
import { UserCard } from "./UserCard";
import { userLoadUsers, userSetSucceed } from "../../store/actionCreators/userActionCreator";

export const UsersPage = () => {
  const dispatch = useDispatch()

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
    <div className="row">
      <h1>Пользователи</h1>

      {loading && <Preloader />}

      {!loading && 
        <div className="collection" style={{border: "0px"}}>
          { users }
        </div>
      }

    </div>
  )
}