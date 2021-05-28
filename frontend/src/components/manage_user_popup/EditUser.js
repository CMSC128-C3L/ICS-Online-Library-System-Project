import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import Modal, { UserContext } from './Modal'
import ConfirmChange from './ConfirmChange'
import './styles.css'

// Edit User UI, user state is from parent Modal
function EditUser({ children }){
    const {user, close} = useContext(UserContext);
    const origClassif = user.classification;
    const [currClassif, setClassif] = useState(origClassif);
    const confirmModal = useRef(null)
    const [confirmed, setConfirmed] = useState(false)
    const handleConfirmation = () => {setConfirmed(true)}

    const handleChange = (event) => {
        setClassif(event.target.value)
    }
    
    const handleSave = (user) =>{confirmModal.current.open(user)}

    // do something here if confirmed then close modal
    useEffect(() => {
        if(confirmed){
            if (origClassif !== currClassif){        

                // send patch request to update and save changes in db
                const updateUser = async () => {
                    try{
                        let options =  {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}, params: {id: user._id},}
                        const res = await axios.patch("/api/users/"+user._id, { classification: currClassif }, options)  
                        console.log(res)         
                    }catch(e){
                        console.log(e)
                    }
                }
                updateUser()
            }
            close()
        }
    }, [confirmed, close, user._id, origClassif, currClassif])

    return(
        <div className="edit-user popup-container">
            <Modal ref={confirmModal}><ConfirmChange onConfirm={handleConfirmation}>Confirm edit</ConfirmChange></Modal>
            <img className="user-avatar" alt={user.name} src={user.avatar}/>
            <h3 className="text regular user-id">{user.id}</h3>
            <h2 className="text user-name">{user.name}</h2>
            <h4 className=" text regular user-email">{user.email}</h4>
            <FormControl variant="filled" style={{height:'50px'}}>
                <InputLabel htmlFor="filled-classif-native-simple">Classification</InputLabel>
                <Select
                native
                value={currClassif}
                onChange={handleChange}
                >
                <option aria-label="Current" value={currClassif}>{currClassif.toUpperCase()}</option>
                {["Admin", "Faculty", "Staff", "Student"].map((classif) => {
                    return(
                        classif !== currClassif? 
                        <option key={classif} value={classif}>{classif.toUpperCase()}</option> :
                        null
                    )
                })}
                </Select>
            </FormControl>
            <button className="save popup-btn" onClick={() => handleSave(user)}>Save Changes</button>
        </div>
    )
}

export default EditUser