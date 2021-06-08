import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import {makeStyles} from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import Modal, { UserContext } from './Modal'
import ConfirmChange from './ConfirmChange'
import './styles.css'
import { blue } from '@material-ui/core/colors'

// Edit User UI, user state is from parent Modal
function EditUser(props){
    const classes = useStyles();
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
                        let options =  {
                            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}, 
                            params: {id: user._id},
                        }
                        const res = await axios.patch(`/api/users/${user._id}`, 
                            { "classification": currClassif }, 
                            options)  
                        console.log(res)         
                    }catch(e){
                        console.log(e)
                    }
                }
                updateUser()

                // update users to trigger useEffect in User Table
                props.getUsers()
            }
            close()
        }
    }, [confirmed, close, user._id, origClassif, currClassif])

    return(
        <div className="edit-user popup-container">
            <Modal ref={confirmModal}><ConfirmChange onConfirm={handleConfirmation}>Confirm edit</ConfirmChange></Modal>
            <img className="user-avatar" alt={user.name} src={user.profile_picture}/>
            <h3 className="text regular user-id">{user.id}</h3>
            <h2 className="text user-name">{user.name}</h2>
            <h4 className=" text regular user-email">{user.email}</h4>
            
            <FormControl style={{height:'50px'}} className={classes.formControl}>
                <InputLabel htmlFor="filled-classif-native-simple" className={classes.input}>Classification</InputLabel>
                <Select
                    native
                    value={currClassif}
                    onChange={handleChange}
                    className={classes.dropdown}
                >
                <option aria-label="Current" value={currClassif} className={classes.selected}>{currClassif.toUpperCase()}</option>
                {["Admin", "Faculty", "Staff", "Student"].map((classif) => {
                    return(
                        classif !== currClassif? 
                        <option key={classif} value={classif} className={classes.option}>{classif.toUpperCase()}</option> :
                        null
                    )
                })}
                </Select>
            </FormControl>
            <button className="save popup-btn" onClick={() => handleSave(user)}>Save Changes</button>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    formControl: {
        padding: '0em 1em',
        backgroundColor: '#47abd8',
        borderRadius: '1em',
        fontSize: '1.5em'
    },
    input: {
        fontSize: '0.75em',
        color: 'rgb(255,255,255,0.75)',
        position: 'absolute',
        left: '15%',
        top: '10%'
    },
    dropdown: {
        color: 'white',
        fontWeight: 'bold',
        letterSpacing: '0.075em',
        fontSize: '0.8em'
    },
    option: {
        color: 'black'
    },
    selected: {
        fontWeight: 'bold',
        color: 'black'
    }
}))

export default EditUser