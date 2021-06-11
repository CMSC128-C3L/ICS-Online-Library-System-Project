import React, {useContext, useState, useRef, useEffect} from 'react'
import Modal, { UserContext } from './Modal'
import ConfirmChange from './ConfirmChange'
import { withRouter } from 'react-router-dom'
import { useHistory, useParams } from 'react-router'
import { makeStyles } from "@material-ui/core/styles"
import SaveIcon from '@material-ui/icons/Save'
import axios from 'axios'
import './Modal.css'

function UpdateDocument(props){
    const {user, close} = useContext(UserContext)
    const history = useHistory();  
    const classes = useStyles();
    const {id} = useParams();

    //for modal confirmation
    const confirmModal = useRef(null)
    const [confirmed, setConfirmed] = useState(false)
    const handleConfirmation = () => {setConfirmed(true)}

    //authorization header
    const options = {
        headers: {'Authorization':  'Bearer ' + localStorage.getItem('token')},
        'Content-Type': 'application/json'
    }

    //for handling update function
    const handleUpdate = (user) => confirmModal.current.open(user)
    const handleCancel = () => close()
    const handleRoute = () => history.push({pathname: `/search/${id}`, state: { fromButtonEdit: false, type: props.type}})
    
    const handleSubmit = async() =>{
        //patch request to update document
        console.log("DOCUMENT TYPE UPDATE Doc: " + props.topic);
        let response;
        try {
            if(props.type=="book"){
                response = await axios.patch(`/api/books/${id}`, {
                    title: props.book.title, 
                    author: props.book.author,
                    year: props.book.year,
                    publisher: props.book.publisher,
                    isbn: props.book.isbn,
                    description: props.book.description,
                    topic: props.book.topic
                } , options);
            } else if(props.type=="thesis"){
                response = await axios.patch(`/api/thesis/${id}`, {
                    title: props.thesis.title, 
                    author: props.thesis.author,
                    adviser: props.thesis.adviser,
                    pub_date: props.thesis.pub_date,
                    abstract: props.thesis.abstract,
                    topic: props.thesis.topic
                } , options);
            } else if(props.type=="sp"){
                response = await axios.patch(`/api/sp/${id}`, {
                    title: props.sp.title, 
                    author: props.sp.author,
                    adviser: props.sp.adviser,
                    pub_date: props.sp.pub_date,
                    abstract: props.sp.abstract,
                    topic: props.sp.topic
                } , options);
            }
            console.log('Returned data:', response.data);
        } catch (e) {
            console.log(`Axios request failed: ${e}`);
        }
    }

    // if confirmed then close modal and redirect to search page to see changes
    useEffect(() => {
        if(confirmed){
            handleSubmit();
            close();
            handleRoute()
        }
    }, [confirmed, close])

    return(
        <div className="save-user popupcontainer">
            <Modal ref={confirmModal}><ConfirmChange onConfirm={handleConfirmation}>Confirm edit</ConfirmChange></Modal>
            <SaveIcon className={classes.iconStyle}/>

            {
                (function(document){
                    console.log("document card value: ", document.type)
                    switch(document.type){
                        case "book":
                            return(<h3 className="text prompt"> Save changes to"{props.book.title}" {props.book.year}? </h3>)
                        case "thesis":
                            return( <h3 className="text prompt"> Save changes to"{props.thesis.title}" {props.thesis.pub_date}? </h3>)
                        case "sp":
                            return(<h3 className="text prompt"> Save changes to"{props.sp.title}" {props.sp.pub_date}? </h3>)
                        default:
                            return null;	
                        }
                })(props)
            }

            <div className="save-cancel">
                <button className="save popup-btn" onClick={()=> handleUpdate(user)}>Save</button>
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

export default withRouter(UpdateDocument);