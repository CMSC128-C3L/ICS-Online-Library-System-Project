import React, {useContext, useState, useRef, useEffect} from 'react'
import Modal, { UserContext } from './Modal'
import ConfirmChange from './ConfirmChange'
import './Modal.css'

import { useHistory } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { useParams } from 'react-router'
import { makeStyles } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'

function DeleteDocument(props){
    const {user, close} = useContext(UserContext)
    const history = useHistory();
    // const history = createBrowserHistory({ forceRefresh: true });
    const classes = useStyles();
    // const {id} = useParams();
    // const [document, setDocument] = useState("")

    const confirmModal = useRef(null)
    const [confirmed, setConfirmed] = useState(false)
    const handleConfirmation = () => {setConfirmed(true)}

    const handleDelete = (user) =>{
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
            <Modal ref={confirmModal}><ConfirmChange onConfirm={handleConfirmation}>Confirm Delete</ConfirmChange></Modal>
            <DeleteIcon className={classes.iconStyle}/>
            <h3 className="text prompt">Are you sure you want to delete?</h3>
            <div className="delete-cancel">
                <button className="delete popup-btn" onClick={()=> handleDelete(user)}>Delete</button>
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

export default DeleteDocument