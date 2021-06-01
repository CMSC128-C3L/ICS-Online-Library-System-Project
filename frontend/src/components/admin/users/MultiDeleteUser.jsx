import React, {useContext, useState, useRef, useEffect} from 'react'
import Modal, { UserContext } from '../../manage_user_popup/Modal'
import ConfirmChange from '../../manage_user_popup/ConfirmChange'
import axios from 'axios'
import '../../manage_user_popup/styles.css'

function MultiDeleteUser(props){
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

            // send delete request to deleter user in db
            const deleteUser = async () => {
                // try{
                //     let options =  {
                //         headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}, 
                //         params: {id: user._id},
                //     }
                //     const res = await axios.delete(`/api/users/${user._id}`, options)  
                //     console.log(res)         
                // }catch(e){
                //     console.log(e)
                // }
            }   
            deleteUser()

            // update users to trigger useEffect in User Table
            props.getUsers()

            close()
        }
    }, [confirmed, close, user._id])

    return(
        <div className="delete-user popup-container">
            <Modal ref={confirmModal}><ConfirmChange onConfirm={handleConfirmation}>Confirm edit</ConfirmChange></Modal>
            <h3 className="text prompt">Are you sure you want to delete</h3>
            <h3 className="text prompt">{user.length} users?</h3>
            <div className="delete-cancel">
                <button className="delete popup-btn" onClick={() => handleDelete(user)}>Delete</button>
                <button className="cancel popup-btn" onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    )
}

export default MultiDeleteUser