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
    const history = createBrowserHistory({});
    const classes = useStyles();
    const {id} = useParams();
    const [document, setDocument] = useState("")

    const confirmModal = useRef(null)
    const [confirmed, setConfirmed] = useState(false)
    const handleConfirmation = () => {setConfirmed(true)}

    //authorization header
    const options = {
        headers: {'Authorization':  'Bearer ' + localStorage.getItem('token')},
        'Content-Type': 'application/json'
    }

    const handleSave = (user) =>{
        confirmModal.current.open(user)
    }

    const handleCancel = () =>{ 
        close()
    }

    const handleRoute = () =>{ 
        // history.push(`/search/${id}`) //ito talaga dapat pero may something sa refresh ni admin
        window.scrollTo(0, 0)
        history.push(`/search/`)
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

    const handleSubmit = async() =>{
        //patch request to update [BOOK]
        console.log("SAVE DOCUMENT TITLE: " + props.book.title);

        try {
            // event.preventDefault();
            const response = await axios.patch(`/api/books/${id}`, {
                title: props.book.title, 
                author: props.book.author,
                year: props.book.year,
                publisher: props.book.publisher,
                isbn: props.book.isbn,
                description: props.book.description
            } , options);
            console.log('Returned data:', response.data);
        } catch (e) {
            console.log(`Axios request failed: ${e}`);
        }
    }

    // if confirmed then close modal and redirect to search page to see changes
    useEffect(() => {
        getDocument()
        if(confirmed){

            
            handleSubmit()
            close()
            console.log("AFTER handle submit")
            // props.handleSubmit()
            handleRoute()
        }
    }, [confirmed, close])

    return(
        <div className="save-user popupcontainer">
            <Modal ref={confirmModal}><ConfirmChange onConfirm={handleConfirmation}>Confirm edit</ConfirmChange></Modal>
            <SaveIcon className={classes.iconStyle}/>
            <h3 className="text prompt">Save changes to"{props.book.title}" {props.book.year}?</h3>
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