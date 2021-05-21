import React, {useState, useEffect} from 'react';
import {Box} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import SaveIcon from '@material-ui/icons/Save';
import GetAppIcon from '@material-ui/icons/GetApp';
import EditIcon from '@material-ui/icons/Edit';
import DocumentCard from './DocumentCard';
import TagsInput from './TagsInput';
import './DocumentCard.css';

function ManageDocument(props) {
//initialize collection of document details to an empty array
const [documentThumbnail, setDocumentThumbnail] = useState("");
const [documentTitle, setDocumentTitle] = useState("");
const [documentAuthor, setDocumentAuthor] = useState("");
const [documentPublished, setDocumentPublished] = useState("");
const [documentPublisher, setDocumentPublisher] = useState("");
const [documentISBN, setDocumentISBN] = useState("");
const [documentDescription, setDocumentDescription] = useState("");

    const getDocument = async() =>{
        try{
            const documents = await axios.get("https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline");
            console.log(documents);
            setDocumentThumbnail(documents.data[0].image_link);
            setDocumentTitle(documents.data[0].name);
            setDocumentAuthor(documents.data[0].brand);
            setDocumentPublished(documents.data[0].id);
            setDocumentPublisher(documents.data[0].product_type);
            setDocumentISBN(documents.data[0].id);
            setDocumentDescription(documents.data[0].description);
        }catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        getDocument()
    }, [])

    const selectedTags = tags => console.log(tags);
    const classes = useStyles();

    return (
            <div className="edit-main-content">
                {
                    <div>
                        <div className='document-card-flex-row'>
                            <div className='image-card-container-flex-column' >
                            <img src={documentThumbnail} alt="" className="thumbnail"></img>
                            </div>
                            
                            <div className='document-card-container document-card-flex-column' key={documentISBN}>
                            <DocumentCard
                                title={documentTitle}
                                author={documentAuthor} 
                                yearPublished={documentPublished}
                                publisher={documentPublisher}
                                docISBN={documentISBN}
                            />
                            <TagsInput selectedTags={selectedTags}/>
                            </div>

                            <div className='document-card-container button-card-flex-column'>
                                <button className={classes.textStyle}><GetAppIcon className={classes.iconStyle}/> DOWNLOAD PDF</button>
                                <button className={classes.textStyle}><EditIcon className={classes.iconStyle}/>UPDATE PDF</button>
                            </div>
                        </div>

                        <div className="description-section">
                            <h2>DESCRIPTION</h2>
                            <Box className={classes.boxStyle}>
                                {documentDescription}
                                {documentDescription}
                                {documentDescription}
                                {documentDescription}
                                {documentDescription}
                                {documentDescription}
                            </Box>
                            
                            <div className = "button-right">
                            <button aria-label="save" style={{ backgroundColor: '#47ABD8', 'borderRadius':'10vh', width:'10vh', height:'10vh'}}><SaveIcon style={{ color: 'black' }}/></button>
                            </div>
                        </div>
                    </div>
                }
            </div>
    )
}

const useStyles = makeStyles(() => ({
    textStyle: {
        background:'transparent',
        padding: '0',
        color:'black',
        width: 'auto',
        'margin-left': '0',
        fontSize:'25px', 
        fontWeight:'bold', 
        fontFamily:'Arial'
    },
    iconStyle: {
        color:'black', 
        width:'5vh', 
        height:'5vh'
    },
    boxStyle:{
        flexWrap: "wrap",
        wordWrap: "break-word",
        wordBreak: "break-all",
        maxWidth: "80em"
    }
  }));


export default ManageDocument