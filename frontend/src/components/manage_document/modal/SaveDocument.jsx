import React, {useContext, useState, useRef, useEffect} from 'react'
import Modal, { UserContext } from './Modal'
import ConfirmChange from './ConfirmChange'
import { withRouter } from 'react-router-dom'
import { useHistory, useParams } from 'react-router'
import { makeStyles } from "@material-ui/core/styles"
import SaveIcon from '@material-ui/icons/Save'
import axios from 'axios'
import './Modal.css'

function SaveDocument(props){
    const {user, close} = useContext(UserContext)
    const history = useHistory();  
    const classes = useStyles();
    
    //reference to modal
    const confirmModal = useRef(null)
    const [confirmed, setConfirmed] = useState(false)
    const handleConfirmation = () => {setConfirmed(true)}

    //authorization header
    const options = {
        headers: {'Authorization':  'Bearer ' + localStorage.getItem('token')},
        'Content-Type': 'application/json'
    }

    // get course api
    const getCourse = async(item) =>{
        const course_data = await axios.get('/api/course/'+ item, options);
        return course_data.data[0];
    }

    const courses = props.course.map(item => getCourse(item))

    //handling save functions
    const handleSave = (user) => confirmModal.current.open(user)
    const handleCancel = () => close()
    const handleRoute = () => history.push({pathname: `/search`, state: { fromButtonEdit: false, type: props.type}})
    const splitAuthors = (author) => {
        let authors = author.split(",");
        authors = authors.map((author) => author.trim());
        return authors;
    }
    
    const handleSubmit = async() =>{
        //post request to create and save document
        let response;
        const data = await Promise.all(courses);
        console.log("save doc: ", typeof(props.book.author))
        try {
            if(props.type=="book"){
                response = await axios.post(`/api/books`, {
                    type: 'Book',
                    id: props.book.id,
                    title: props.book.title, 
                    author: splitAuthors(props.book.author),
                    book_cover_img: 'https://geniuspublicationsjaipur.files.wordpress.com/2013/04/software-engineering-book.jpg',
                    year: props.book.year,
                    publisher: props.book.publisher,
                    isbn: props.book.isbn,
                    description: props.book.description,
                    topic: props.topic,
                    courses: data
                } , options);
            } else if(props.type=="thesis"){
                response = await axios.post(`/api/thesis`, {
                    type: 'Thesis',
                    id: props.thesis.id,
                    title: props.thesis.title,
                    author: splitAuthors(props.thesis.author),
                    adviser: splitAuthors(props.thesis.adviser),
                    pub_date: props.thesis.pub_date,
                    abstract: props.thesis.abstract,
                    topic: props.topic,
                    courses: data,
                    source_code: props.source_code,
                    journal: props.journal,
                    poster: props.poster
                } , options);
            } else if(props.type=="sp"){
                response = await axios.post(`/api/sp`, {
                    type: 'Special Problem',
                    id: props.sp.id,
                    title: props.sp.title,
                    author: splitAuthors(props.sp.author),
                    adviser: splitAuthors(props.sp.adviser),
                    pub_date: props.sp.pub_date,
                    abstract: props.sp.abstract,
                    topic: props.topic,
                    courses: data,
                    source_code: props.source_code,
                    journal: props.journal,
                    poster: props.poster  
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
            <h3 className="text prompt"> ADD NEW DOCUMENT </h3>
            {(function(document){
                switch(document.type){
                    case "book":
                        return( <h3 className="text prompt"> Are you sure you want to create "{document.book.title}" {document.book.year}? </h3>)
                    case "thesis":
                        return( <h3 className="text prompt"> Are you sure you want to create "{document.thesis.title}" {document.thesis.pub_date}? </h3>)
                    case "sp":
                        return( <h3 className="text prompt"> Are you sure you want to create "{document.sp.title}" {document.sp.pub_date}? </h3>)
                    default:
                        return null;	
                    }
            })(props)}

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

export default withRouter(SaveDocument);