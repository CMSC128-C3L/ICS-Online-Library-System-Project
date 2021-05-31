import React, {useContext, useState, useRef, useEffect} from 'react'
import Modal, { UserContext } from './Modal'
import ConfirmChange from './ConfirmChange'
import './Modal.css'

import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/ImportContacts'

function AddDocument(props){
    const {user, close} = useContext(UserContext)
    const history = useHistory();
    const classes = useStyles();

    const confirmModal = useRef(null)
    const [confirmed, setConfirmed] = useState(false)
    const handleConfirmation = () => {setConfirmed(true)}

    const handleAdd = (user) =>{
        confirmModal.current.open(user)
    }

    const handleCancel = () =>{ 
        close()
    }

    const handleRoute = () =>{ 
        history.push(`/search/`)
    }

    // if confirmed then close modal and redirect to search page to see changes
    useEffect(() => {
        if(confirmed){
            close()
            handleRoute()
        }
    }, [confirmed, close])

    return(
        <div className="delete-user popupcontainer">
            <Modal ref={confirmModal}><ConfirmChange onConfirm={handleConfirmation}>Confirm Add</ConfirmChange></Modal>
            <AddIcon className={classes.iconStyle}/>
            <h3 className="text prompt">Add new document?</h3>
            <div className="delete-cancel">
                <button className="delete popup-btn" onClick={()=> handleAdd(user)}>Add</button>
                <button className="cancel popup-btn" onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    )
}

const useStyles = makeStyles(() => ({
    iconStyle: {
        color:'black', 
        width:'5vh', 
        height:'5vh'
    }
  }));

export default AddDocument