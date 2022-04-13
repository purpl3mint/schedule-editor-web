import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

export const Sidebar = () => {
    const [component, setComponent] = useState(
        <div className="collection col s2" style={{padding: 0, marginRight: "4%"}}>
        </div>
    )

    useEffect(() => {
        let newComponent = (
            <div className="collection col s2" style={{padding: 0, marginRight: "4%"}}>
                <NavLink to="/users" className="collection-item">Пользователи</NavLink>
                <NavLink to="/contents" className="collection-item">Контент</NavLink>
                <NavLink to="/banners" className="collection-item">Баннеры</NavLink>
                <NavLink to="/tickers" className="collection-item">Бегущие строки</NavLink>
                <NavLink to="/mediaplans" className="collection-item">Медиапланы</NavLink>
                <NavLink to="/testeditor/1" className="collection-item">Редактор</NavLink>
            </div>
        )
        setComponent(newComponent)

    }, [])
    

    return component || <div className="collection col s2" style={{padding: 0, marginRight: "4%"}}></div>
}