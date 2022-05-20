import React, { useCallback, useEffect} from "react"
import { useDispatch, useSelector } from 'react-redux'
import jwt from 'jwt-decode'
import { cabinetChangePassword, cabinetSetPasswordForm, cabinetSetLogin } from "../../store/actionCreators/cabinetActionCreator"

export const CabinetPage = () => {
    const dispatch = useDispatch()

    const username = useSelector(state => state.cabinetReducer.login)
    const form = useSelector(state => state.cabinetReducer.setPasswordForm)

    const loadHandler = useCallback(() => {
        const token = JSON.parse(localStorage.getItem('userData')).token
        const login = jwt(token.token).login
        const id = jwt(token.token).id - 0
        dispatch(cabinetSetLogin(login))
        dispatch(cabinetSetPasswordForm("id", id))
    }, [dispatch])

    const changeHandler = useCallback((e) => {
        dispatch(cabinetSetPasswordForm(e.target.name, e.target.value))
    }, [dispatch])

    const setPasswordHandler = useCallback(() => {
        dispatch(cabinetChangePassword(form))
    }, [dispatch, form])

    useEffect(() => { loadHandler() }, [loadHandler])


    return (
        <div className="col s9">
            <h1>Личный кабинет</h1>
            <div className="col s12">
                <span className="cabinet-page__username">Имя пользователя: {username}</span><br />
            </div>

            <div className="col s12">
                <h3>Изменить пароль</h3>
                
                <div className="row">
                    <div className="input-field col s6">
                    <input id="password" name="password" type="password" value={form.password} onChange={changeHandler} />
                    <span className="helper-text">Пароль</span>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s6">
                    <input id="newPassword" name="newPassword" type="password" value={form.newPassword} onChange={changeHandler}/>
                    <span className="helper-text">Новый пароль</span>
                    </div>
                </div>

                <button className="btn blue-grey darken-1" onClick={setPasswordHandler}>Создать</button>
            </div>
        </div>
    )
}