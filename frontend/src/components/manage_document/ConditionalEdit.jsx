import React, { useState, useEffect, useRef} from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from 'react-router';
import {Box} from "@material-ui/core";
import axios from 'axios';
import DownloadIcon from '@material-ui/icons/GetApp';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import DocumentCard from './DocumentCard';
import TagsInput from './TagsInput';
import Modal from './modal/Modal';
import DeleteUser from './modal/SaveDocument';
import './DocumentCard.css';

/**
 * functional component
 * conditionally allow edit on documents depending on the button clicked from admin view
 * onChange triggers update from functions stated in manage document 
 */

function ConditionalEdit(props){
  const classes = useStyles();
  const [document, setDocument] = useState("");
  const {id} = useParams();

  //get flag whether the edit button from manage document is clicked
  let location = useLocation();
  let allowEdit;
  if(location.state != undefined){
    allowEdit = location.state.fromButtonEdit;
  } else {
    allowEdit = false;
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

  useEffect(() => {
      getDocument()
  }, [])

  // Create reference to modal
  const saveModal = useRef(null)
  const openSaveModal = (user) => {saveModal.current.open(user)}

  return(
    <div>
      {
        (function(allowEdit){
          switch(allowEdit){
            // editable document
            case true:
              return(
                <div> 
                    <Modal ref={saveModal}><DeleteUser/></Modal>

                    <div className='document-card-flex-row'>
                        {/* document thumbnail not editable */}
                        <div className='image-card-container' >
                        <img src={document.book_cover_img} alt="" className={classes.imageStyle}></img>
                        </div>
                        
                        {/* document attributes are editable*/}
                        <div className='document-card-container document-card-flex-column' key={document.id}>
                          <div className="document-card-flex-column"> 
                          <div className="main-text-tags">Classification: Book</div>
                          <div className="main-text-tags">Title: <input type="text" defaultValue={document.title} onChange={props.updateTitle}/> </div>
                          <div className="main-text-tags">Author: <input type="text" defaultValue={document.author} onChange={props.updateAuthor}/> </div>
                          <div className="main-text-tags">Year: <input type="text" defaultValue={document.year} onChange={props.updateYear}/></div>
                          <div className="main-text-tags">Publisher: <input type="text" defaultValue={document.publisher} onChange={props.updatePublisher}/> </div>
                          <div className="main-text-tags">ISBN: <input type="text" defaultValue={document.isbn} onChange={props.updateISBN}/> </div>
                          </div>
                          <TagsInput/>
                        </div>

                        <div className='document-card-container button-card-flex-column'>
                          <button className={classes.textStyle} onClick={props.handleDownload}><DownloadIcon className={classes.iconStyle}/> DOWNLOAD PDF</button>
                          <button className={classes.textStyle} onClick={props.handleEdit}><EditIcon className={classes.iconStyle}/>UPDATE PDF</button>
                        </div>
                    </div>

                    <div className="description-section">
                        {/* descriptions/abstracts are editable*/}
                        <h2>DESCRIPTION</h2>
                        <Box className={classes.boxStyle}>
                          <input type="text" defaultValue={document.description} onChange={props.updateDescription} style={{width:'80em', lineHeight: '28px'}}/> 
                        </Box>
                        
                        <div className = "button-right">
                        <button className={classes.saveStyle} onClick={() => openSaveModal()}><SaveIcon className={classes.iconStyle}/></button>
                        </div>
                    </div>
                </div>
              )
              // unable to edit document
            case false:
              return(
                <div> 
                    <div className='document-card-flex-row'>
                        <div className='image-card-container' >
                        <img src={document.book_cover_img} alt="" className={classes.imageStyle}></img>
                        </div>
                        
                        <div className='document-card-container document-card-flex-column' key={document.id}>
                        <DocumentCard
                            classification={document.classification}
                            title={document.title}
                            author={document.author} 
                            yearPublished={document.year}
                            publisher={document.publisher}
                            docISBN={document.isbn}
                        />
                        </div>

                    </div>

                    <div className="description-section">
                        <h2 style={{textAlign: 'center'}}>DESCRIPTION</h2>
                        <Box className={classes.descriptionStyle}>
                            {document.description}
                        </Box>
                    </div>
                </div>
              )
            default:
              return null;	
          }
        })(allowEdit)
    }
    </div>
  )
}

const useStyles = makeStyles(() => ({
  textStyle: {
      '&:hover': {
          color: "#47ABD8",
       },
      background:'transparent',
      padding: '0',
      color:'black',
      width: 'auto',
      'margin-left': '0',
      fontSize:'25px', 
      fontWeight:'bold', 
      border:'transparent',
      fontFamily:'Arial',
  },
  iconStyle: {
      '&:hover': {
          color: "#b3e5fc",
       },
      color:'black', 
      width:'5vh', 
      height:'5vh'
  },
  saveStyle:{ 
      backgroundColor: '#47ABD8', 
      border:'transparent',
      borderRadius:'10vh', 
      width:'10vh', 
      height:'10vh'
  },
  boxStyle:{
    // background:'red',
    flexWrap: "wrap",
    wordWrap: "break-word",
    wordBreak: "break-all",
    maxWidth: "80em"
  },
  descriptionStyle:{
    flexWrap: "wrap",
    textAlign: 'center',
    paddingBottom:'5vh',
    wordWrap: "break-word",
    wordBreak: "break-all"
  },
  imageStyle:{
      width: '300px', 
      height: '500px', 
      objectFit: 'cover'
  }
}));

export default ConditionalEdit;