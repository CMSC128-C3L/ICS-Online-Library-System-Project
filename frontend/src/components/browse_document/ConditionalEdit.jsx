import React, { useContext,useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from '../user/UserContext';
import { useParams } from 'react-router';
import {Box} from "@material-ui/core";
import axios from 'axios';
import DownloadIcon from '@material-ui/icons/GetApp';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import DocumentCard from './DocumentCard';
import TagsInput from './TagsInput';
import './DocumentCard.css';

/**
 * functional component with an IIFE inside
 * conditionally allow edit on documents depending on the type of user
 * onClick triggers the handler from parent card component
 */

function ConditionalEdit(props){
  const classes = useStyles();
  const {loggedUser, setLoggedUser} = useContext(UserContext);
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

  return(
    <div>
      {
        (function(allowEdit){
          switch(allowEdit){
            case true:
              return(
                <div> 
                    <div className='document-card-flex-row'>
                        <div className='image-card-container' >
                        <img src={document.book_cover_img} alt="" className={classes.imageStyle}></img>
                        </div>
                        
                        <div className='document-card-container document-card-flex-column' key={document.id}>
                        <DocumentCard
                            title={document.title}
                            author={document.author} 
                            yearPublished={document.year}
                            publisher={document.author}
                            docISBN={document.isbn}
                        />
                        <TagsInput/>
                        </div>

                         <div className='document-card-container button-card-flex-column'>
                          <button className={classes.textStyle} onClick={props.handleDownload}><DownloadIcon className={classes.iconStyle}/> DOWNLOAD PDF</button>
                          <button className={classes.textStyle} onClick={props.handleEdit}><EditIcon className={classes.iconStyle}/>UPDATE PDF</button>
                        </div>
                    </div>

                    <div className="description-section">
                        <h2>DESCRIPTION</h2>
                        <Box className={classes.boxStyle}>
                            {document.description}
                        </Box>
                        
                        <div className = "button-right">
                        <button aria-label="save" className={classes.saveStyle}><SaveIcon className={classes.iconStyle}/></button>
                        </div>
                    </div>
                </div>
              )
              break;
            case false:
              return(
                <div> 
                    <div className='document-card-flex-row'>
                        <div className='image-card-container' >
                        <img src={document.book_cover_img} alt="" className={classes.imageStyle}></img>
                        </div>
                        
                        <div className='document-card-container document-card-flex-column' key={document.id}>
                        <DocumentCard
                            title={document.title}
                            author={document.author} 
                            yearPublished={document.year}
                            publisher={document.author}
                            docISBN={document.isbn}
                        />
                        </div>

                    </div>

                    <div className="description-section">
                        <h2>DESCRIPTION</h2>
                        <Box className={classes.boxStyle}>
                            {document.description}
                        </Box>
                    </div>
                </div>
              )
              break;
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
    flexWrap: "wrap",
    wordWrap: "break-word",
    wordBreak: "break-all",
    maxWidth: "80em"
  },
  imageStyle:{
      width: '300px', 
      height: '500px', 
      objectFit: 'cover'
  }
}));

export default ConditionalEdit;