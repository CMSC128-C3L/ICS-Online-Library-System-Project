import { useRadioGroup } from '@material-ui/core'
import React, {useContext} from 'react'
import { UserContext } from './Modal'
import './styles.css'

function DeleteUser({ children }){
    const {user} = useContext(UserContext)

    function handleDelete(){
        console.log("delete has been clicked!")
        /** do something here */
    }

    function handleCancel(){
        console.log("cancel has been clicked!")
        /** do something here */
    }

    return(
        <div className="delete-user popup-container">
            <h3 className="text prompt">Are you sure you want to delete</h3>
            <img className="user-avatar" alt={user.name} src={user.avatar}/>
            <h3 className="text regular user-id">{user.id}</h3>
            <h2 className="text user-name">{user.name}</h2>
            <h4 className=" text regular user-email">{user.email}</h4>
            <div className="delete-cancel">
                <button className="delete popup-btn" onClick={handleDelete}>Delete</button>
                <button className="cancel popup-btn" onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    )
}

export default DeleteUser