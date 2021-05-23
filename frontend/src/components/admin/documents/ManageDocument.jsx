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
const [document, setDocument] = useState("");

    const getDocument = async() =>{
        try{
            const documents = await axios.get("https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline");
            console.log(documents);
            setDocument(documents.data[0]);
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
                            <img src={document.image_link} alt="" className="thumbnail"></img>
                            </div>
                            
                            <div className='document-card-container document-card-flex-column' key={document.id}>
                            <DocumentCard
                                title={document.name}
                                author={document.brand} 
                                yearPublished={document.id}
                                publisher={document.product_type}
                                docISBN={document.id}
                            />
                            <TagsInput/>
                            </div>

                            <div className='document-card-container button-card-flex-column'>
                                <button className={classes.textStyle}><GetAppIcon className={classes.iconStyle}/> DOWNLOAD PDF</button>
                                <button className={classes.textStyle}><EditIcon className={classes.iconStyle}/>UPDATE PDF</button>
                            </div>
                        </div>

                        <div className="description-section">
                            <h2>DESCRIPTION</h2>
                            <Box className={classes.boxStyle}>
                                {document.description}
                                {document.description}
                                {document.description}
                                {document.description}
                                {document.description}
                                {document.description}
                            </Box>
                            
                            <div className = "button-right">
                            <button aria-label="save" className={classes.saveStyle}><SaveIcon className={classes.iconStyle}/></button>
                            </div>
                        </div>
                    </div>
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
    }
  }));

export default ManageDocument