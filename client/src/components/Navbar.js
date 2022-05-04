import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const Navbar = () => {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        navigate('/')
    }

    
    return (
        <nav className="nav-extended">
            <div className="nav-wrapper blue-grey darken-1" style={{paddingLeft: "100px", paddingRight: "100px"}}>
                
                <NavLink to="/" className="brand-logo hide-on-med-and-down" style={{fontSize: "20px", maxWidth: "50vw"}}>Редактор медиапланов</NavLink>

                <a href="/" data-target="mobile-demo" className="sidenav-trigger right">
                </a>
                
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/">Начальная страница</NavLink></li>
                    <li>
                        <a href="/" onClick={logoutHandler} style={{display:"flex"}}>
                            <i className="material-icons" style={{marginRight: "10px"}}>logout</i>
                            <span>Выход</span>
                        </a>
                    </li>
                </ul>

                <NavLink to="/" className="brand-logo hide-on-large-only " style={{fontSize: "16px", maxWidth: "50vw"}}>Редактор медиапланов</NavLink>

                <ul id="nav-mobile" className="right hide-on-large-only">
                    <li>
                        <a href="/" onClick={logoutHandler} style={{display:"flex"}}>
                            <i className="material-icons" style={{marginRight: "10px"}}>logout</i>
                        </a>
                    </li>
                </ul>

            </div>
        </nav>
    )
    
    
}