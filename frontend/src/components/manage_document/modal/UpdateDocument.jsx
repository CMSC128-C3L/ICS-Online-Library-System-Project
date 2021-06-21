import React, {useContext, useState, useRef, useEffect} from 'react'
import Modal, { UserContext } from './Modal'
import ConfirmChange from './ConfirmChange'
import { useHistory, useParams } from 'react-router'
import { makeStyles } from "@material-ui/core/styles"
import SaveIcon from '@material-ui/icons/Save'
import axios from 'axios'
import './Modal.css'
import {FileContext} from '../FileContext'
import {PosterContext} from '../PosterContext'
import {BookCoverContext} from '../BookCoverContext';
import { ManuscriptContext } from '../ManuscriptContext'

function UpdateDocument(props){
    const {user, close} = useContext(UserContext)
    const history = useHistory();  
    const classes = useStyles();
    const {id} = useParams();
    const {file, setFile} = useContext(FileContext);
    const {poster, setPoster} = useContext(PosterContext);
    const {cover, setCover} = useContext(BookCoverContext);
    const {manus, setManus} = useContext(ManuscriptContext);
    //for modal confirmation
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

    //for handling update function
    const handleUpdate = (user) => confirmModal.current.open(user)
    const handleCancel = () => close()
    const handleRoute = () => {

        history.push({pathname: `/search/${id}`, state: { fromButtonEdit: false, type: props.type}})
    }
    const splitAuthors = (author) => {
        let authors = author.toString().split(",");
        authors = authors.map((author) => author.trim());
        return authors;
    }
    
    const handleSubmit = async() =>{
        //patch request to update document
        let response;
        const data = await Promise.all(courses);
        
        try {

            // console.log("manus", manus[0].name);
           
            if(props.type=="book"){
                response = await axios.patch(`/api/books/${id}`, {
                    title: props.book.title, 
                    author: splitAuthors(props.book.author),
                    year: props.book.year,
                    publisher: props.book.publisher,
                    isbn: props.book.isbn,
                    description: props.book.description,
                    topic: props.book.topic,
                    courses:data 
                } , options);

                if(cover.length > 0){
                    const formData = new FormData();
                    // formData.append("title", props.thesis.title);
                    formData.append("book_cover", cover[0]);
                    try{
                        axios.post('/api/books/upload/'+response.data._id, formData, options);

                    }catch(e){
                        console.log(e)
                    }
                }
            } else if(props.type=="thesis"){


                response = await axios.patch(`/api/thesis/${id}`, {
                    title: props.thesis.title, 
                    author: splitAuthors(props.thesis.author),
                    adviser: splitAuthors(props.thesis.adviser),
                    pub_date: props.thesis.pub_date,
                    abstract: props.thesis.abstract,
                    topic: props.thesis.topic,
                    courses: data,
                    source_code: props.thesis.source_code,
                    journal: props.thesis.journal,
                    poster: props.thesis.poster
                } , options);

                //upload document

                if(file.length > 0 || poster.length > 0 || manus.length > 0){
                    const formData = new FormData();
                    formData.append("title", props.thesis.title);
                    if(file.length > 0)  formData.append("journal", file[0]);
                    if(poster.length > 0) formData.append("poster", poster[0]);
                    if(manus.length > 0) formData.append("thesisDocument", manus[0]);

                    try{
                        axios.post(`/api/thesis/upload/${id}`, formData, options);
                    }catch(e){
                        console.log(e)
                    }
                }

            } else if(props.type=="sp"){
                response = await axios.patch(`/api/sp/${id}`, {
                    title: props.sp.title, 
                    author: splitAuthors(props.sp.author),
                    adviser: splitAuthors(props.sp.adviser),
                    pub_date: props.sp.pub_date,
                    abstract: props.sp.abstract,
                    topic: props.sp.topic,
                    courses: data,
                    source_code: props.sp.source_code,
                    journal: props.sp.journal,
                    poster: props.sp.poster  
                } , options);
                

                if(file.length > 0 || poster.length > 0 || manus.length > 0){

                    const formData = new FormData();
                    formData.append("title", props.sp.title);
                    if(file.length > 0)  formData.append("journalFile", file[0]);
                    if(poster.length > 0) formData.append("posterFile", poster[0]);
                    if(manus.length > 0) formData.append("spFile", manus[0]);

                    try{
                        axios.post(`/api/sp/upload/${id}`, formData, options);
                    }catch(e){
                        console.log(e)
                    }
                }
                
            }
            handleRoute()
        } catch (e) {
            console.log(`Axios request failed: ${e}`);
        }
    }

    // if confirmed then close modal and redirect to search page to see changes
    useEffect(async() => {
        if(confirmed){

            handleSubmit();
            close();
        }
    }, [confirmed, close])

    return(
        <div className="save-user popupcontainer">
            <Modal ref={confirmModal}><ConfirmChange onConfirm={handleConfirmation}>Confirm edit</ConfirmChange></Modal>
            <SaveIcon className={classes.iconStyle}/>

            {
                (function(document){
                   
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

export default UpdateDocument;
