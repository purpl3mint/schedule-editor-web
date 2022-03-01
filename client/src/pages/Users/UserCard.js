import React, { useCallback } from "react"
import { NavLink } from 'react-router-dom'

export const UserCard = (props) => {
  const {username, id, type} = props

  const deleteHandler = useCallback(() => {
    console.log("Deleting user will added later");
  }, [])

  return (
    <div className="row">
            <div className="col s10">
                <div
                    className="collection-item card" 
                    style={{marginBottom: "25px", border: "1px solid grey"}}
                >
                    {username}<br/>
                    Тип: {type}
                </div>
            </div>

            <button name={id} className="btn" onClick={deleteHandler}>
                <i className="material-icons">delete</i>
            </button>
        </div>
  )
}