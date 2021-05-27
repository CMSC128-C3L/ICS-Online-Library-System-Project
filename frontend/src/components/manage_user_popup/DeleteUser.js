import { useRadioGroup } from '@material-ui/core'
import React, {useContext, useState, useRef, useEffect} from 'react'
import Modal, { UserContext } from './Modal'
import ConfirmChange from './ConfirmChange'
import React, {useContext} from 'react'
import axios from 'axios'
import { UserContext } from './Modal'
import './styles.css'

function DeleteUser({ children }){
    const {user, close} = useContext(UserContext)
    const confirmModal = useRef(null)
    const [confirmed, setConfirmed] = useState(false)
    const handleConfirmation = () => {setConfirmed(true)}

    function handleDelete(){
        confirmModal.current.open(user)
    }

    function handleCancel(){
        close()
    }

    // do something here if confirmed then close modal
    useEffect(() => {
        if(confirmed){
            console.log('yay confirmed delete')
            
            // send delete request to deleter user in db
            const deleteUser = async () => {
                try{
                    let options =  {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}, params: {id: user._id},}
                    const res = await axios.delete("/api/users/"+user._id, options)  
                    console.log(res)         
                }catch(e){
                    console.log(e)
                }
            }   
            deleteUser()
            close()
        }
    }, [confirmed])

    return(
        <div className="delete-user popup-container">
            <Modal ref={confirmModal}><ConfirmChange onConfirm={handleConfirmation}>Confirm edit</ConfirmChange></Modal>
            <h3 className="text prompt">Are you sure you want to delete</h3>
            <img className="user-avatar" alt={user.name} src={user.avatar}/>
            <h3 className="text regular user-id">{user.id}</h3>
            <h2 className="text user-name">{user.name}</h2>
            <h4 className=" text regular user-email">{user.email}</h4>
            <div className="delete-cancel">
                <button className="delete popup-btn" onClick={() => handleDelete(user)}>Delete</button>
                <button className="cancel popup-btn" onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    )
}

export default DeleteUser