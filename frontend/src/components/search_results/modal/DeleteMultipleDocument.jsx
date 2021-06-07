import React, {useContext, useState, useRef, useEffect} from 'react'
import Modal, { UserContext } from './Modal'
import ConfirmChange from './ConfirmChange'
import axios from 'axios'
import './Modal.css'

import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'

function DeleteDocument(props){
    const {user, close} = useContext(UserContext)
    const history = useHistory();
    const classes = useStyles();

    const confirmModal = useRef(null)
    const [confirmed, setConfirmed] = useState(false)
    const handleConfirmation = () => {setConfirmed(true)}

    //authorization header
    const options = {
        headers: {'Authorization':  'Bearer ' + localStorage.getItem('token')},
        'Content-Type': 'application/json'
    }

    const handleDelete = (user) =>{
        confirmModal.current.open(user)
    }

    const handleCancel = () =>{ 
        close()
    }

    const handleRoute = () =>{ 
        history.push(`/search/`)
    }

    const deleteDocument = async() =>{
        //delete request to remove multiple document
        console.log("DOCUMENT TYPE DELETE Doc: " + props.thesis.id);
        
        let response;
        try {
            if(props.type=="Book"){
                response = await axios.delete(`/api/book/${props.book._id}`, options);
            } else if(props.type=="Thesis"){
                response = await axios.delete(`/api/thesis/${props.thesis._id}`, options);
            } else if(props.type=="Special Problem"){
                response = await axios.delete(`/api/sp/${props.sp._id}`, options);
            }
            console.log('Returned data:', response.data);
        } catch (e) {
            console.log(`Axios request failed: ${e}`);
        }
    }

    // if confirmed then close modal and redirect to search page to see changes
    useEffect(() => {
        if(confirmed){
            deleteDocument()
            handleRoute()
            close()
        }
    }, [confirmed, close])

    return(
        <div className="delete-user popupcontainer">
            <Modal ref={confirmModal}><ConfirmChange onConfirm={handleConfirmation}>Confirm Delete</ConfirmChange></Modal>
            <DeleteIcon className={classes.iconStyle}/>
            {
                (function(document){
                    console.log("document card value: ", document.type)
                    
                    switch(document.type){
                        case "Book":
                            return(
                                <h3 className="text prompt"> Are you sure you want to delete "{document.book.title}" {document.book.year}? </h3>
                            )
                        case "Thesis":
                            return(
                                <h3 className="text prompt"> Are you sure you want to delete "{document.thesis.title}" {document.thesis.pub_date}? </h3>
                            )
                        case "Special Problem":
                            return(
                                <h3 className="text prompt"> Are you sure you want to delete "{document.sp.title}" {document.sp.pub_date}? </h3>
                            )
                        default:
                            return null;	
                        }
                })(props)
            }

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