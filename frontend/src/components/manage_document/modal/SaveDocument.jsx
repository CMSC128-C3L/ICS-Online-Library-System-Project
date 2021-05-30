import React, {useContext, useState, useRef, useEffect} from 'react'
import Modal, { UserContext } from './Modal'
import ConfirmChange from './ConfirmChange'
import axios from 'axios'
import './Modal.css'

import { useHistory } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { useParams } from 'react-router'
import { makeStyles } from "@material-ui/core/styles"
import SaveIcon from '@material-ui/icons/Save'

function SaveDocument(props){
    const {user, close} = useContext(UserContext)
    // const history = useHistory();
    const history = createBrowserHistory({ forceRefresh: true });
    const classes = useStyles();
    const {id} = useParams();
    const [document, setDocument] = useState("")

    const confirmModal = useRef(null)
    const [confirmed, setConfirmed] = useState(false)
    const handleConfirmation = () => {setConfirmed(true)}

    const handleSave = (user) =>{
        confirmModal.current.open(user)
    }

    const handleCancel = () =>{ 
        close()
    }

    const handleRoute = () =>{ 
        history.push(`/search/${id}`)
    }

     //get the specific document data 
    const getDocument = async() =>{
        try{
            const document = await axios.get(`/api/books/${id}`);
            console.log(document.data);
            setDocument(document.data);
        }catch(e){
            console.log(e)
        }
    }

    // if confirmed then close modal and redirect to search page to see changes
    useEffect(() => {
        getDocument()
        if(confirmed){
            close()
            console.log(document.data);
            handleRoute()
        }
    }, [confirmed, close])

    return(
        <div className="save-user popup-container">
            <Modal ref={confirmModal}><ConfirmChange onConfirm={handleConfirmation}>Confirm edit</ConfirmChange></Modal>
            <SaveIcon className={classes.iconStyle}/>
            <h3 className="text prompt">Save changes to"{document.title}" {document.year}?</h3>
            <div className="save-cancel">
                <button className="save popup-btn" onClick={()=> handleSave(user)}>Save</button>
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

export default SaveDocument