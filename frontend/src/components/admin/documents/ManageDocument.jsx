import React, {useState, useEffect} from 'react';
import {Box} from "@material-ui/core";
import axios from 'axios';
import SaveIcon from '@material-ui/icons/Save';
import GetAppIcon from '@material-ui/icons/GetApp';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DocumentCard from './DocumentCard';
import TagsInput from './TagsInput';
import './DocumentCard.css';

function ManageDocument(props) {
//initialize collection of document to an empty array
const [document, setDocument] = useState([])

    const getDocument = async() =>{
        try{
            const documents = await axios.get("http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline");
            setDocument(documents.data)
        }catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        getDocument()
    }, [])

    const selectedTags = tags => console.log(tags)

    return (
            <div>
                {
                    document.map(document=>{
                        return (
                            <div>
                                <div className='document-card-flex-row'>
                                    <div className='document-card-container document-card-flex-column'>
                                    <img src={document.image_link} alt="" className="thumbnail"></img>
                                    </div>
                                    
                                    <div className='document-card-flex-column'>
                                    <DocumentCard
                                        title={document.name}
                                        author={document.brand} 
                                        yearPublished={document.id}
                                        publisher={document.product_type}
                                        docISBN={document.id}
                                    />
                                    <TagsInput selectedTags={selectedTags}/>
                                    </div>

                                    <div className='document-card-container document-card-flex-column'>
                                        <IconButton aria-label="download" style={{ backgroundColor: 'transparent' }}><GetAppIcon/>Download</IconButton>
                                        <IconButton aria-label="edit" style={{ backgroundColor: 'transparent' }}><EditIcon/>Edit</IconButton>
                                    </div>
                                </div>

                                <div className="description-section">
                                    <h1>DESCRIPTION</h1>
                                    <Box
                                        component="div"
                                        style={{
                                        flexWrap: "wrap",
                                        wordWrap: "break-word",
                                        wordBreak: "break-all",
                                        maxWidth: "80em"
                                        }}
                                        >

                                        {document.description}
                                        {document.description}
                                        {document.description}
                                        {document.description}
                                        {document.description}
                                        {document.description}
                                        
                                    </Box>
                                    
                                    <IconButton aria-label="save" style={{ backgroundColor: 'lightblue', left:'50em' }}><SaveIcon/></IconButton>
                                </div>
                            </div>
                        )

                    })
                }
            </div>
    )
}

export default ManageDocument