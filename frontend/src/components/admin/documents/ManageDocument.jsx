import React, {useState, useEffect} from 'react';
import axios from 'axios';
import SaveIcon from '@material-ui/icons/Save';
import GetAppIcon from '@material-ui/icons/GetApp';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DocumentCard from './DocumentCard';
import TagsInput from './TagsInput';
import './DocumentCard.css';

function ManageDocument(props) {
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

    const chosenDocument = () =>{
       return (document.filter(document=>{
                return document
        }))

    }

    const selectedTags = tags => console.log(tags)

    return (
            <div className='document-card-flex-row'>
                {
                    chosenDocument().map(document=>{
                        return (
                            <div className='document-card-flex-row'>
                                <div className='document-card-container document-card-flex-column'>
                                <img src={document.image_link} alt="" className="thumbnail"></img>
                                </div>
                                
                                <div className='document-card-container document-card-flex-column'>
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
                                    <IconButton aria-label="download"><GetAppIcon/>Download</IconButton>
                                    <IconButton aria-label="edit"><EditIcon/>Edit</IconButton>
                                    <IconButton aria-label="save"><SaveIcon/>Save</IconButton>
                                </div>
                            </div>
                        )

                    })
                }
            </div>
    )
}

export default ManageDocument