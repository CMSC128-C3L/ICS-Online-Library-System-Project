import React, {useContext, useState, useRef, useEffect} from 'react'
import Modal, { UserContext } from '../../manage_user_popup/Modal'
import ConfirmChange from '../../manage_user_popup/ConfirmChange'
import axios from 'axios'
import '../../manage_user_popup/styles.css'

function MultiDeleteUser(props){
    const {user: users, close} = useContext(UserContext) // user here is an array of user objects
    const confirmModal = useRef(null)
    const [confirmed, setConfirmed] = useState(false)
    const handleConfirmation = () => {setConfirmed(true)}

    function handleDelete(){
        confirmModal.current.open(users)
    }

    function handleCancel(){
        close()
    }

    // do something here if confirmed then close modal
    useEffect(() => {
        if(confirmed){

            // send delete request to delete user in db
            const deleteUser = async (userId) => {
                try{
                    let options =  {
                        headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}, 
                        params: {id: userId},
                    }
                    const res = await axios.delete(`/api/users/${userId}`, options)  
                    console.log(res)         
                }catch(e){
                    console.log(e)
                }
            }
            
            // delete users
            users.forEach((userId) => {
                deleteUser(userId)
            })

            props.resetSelected() // reset selected array
            props.getUsers() // update users to trigger useEffect in User Table
            close() // close modal
        }
    }, [confirmed, close, users])

    return(
        <div className="popup-container multi-delete-user">
            <Modal ref={confirmModal}><ConfirmChange onConfirm={handleConfirmation}>Confirm edit</ConfirmChange></Modal>
            <h3 className="text prompt">Are you sure you want to delete</h3>
            <h3 className="text prompt">{users.length} {users.length > 1 ? 'users' : 'user'}</h3>
            <div className="delete-cancel">
                <button className="delete popup-btn" onClick={() => handleDelete(users)}>Delete</button>
                <button className="cancel popup-btn" onClick={handleCancel}>Cancel</button>
            </div>
            <p></p>
        </div>
    )
}

export default MultiDeleteUser