import React, {useState, useEffect} from 'react'
import axios from 'axios'
import SaveIcon from '@material-ui/icons/Save';
import GetAppIcon from '@material-ui/icons/GetApp';
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit';
import DocumentCard from './DocumentCard';

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

    return (
            <div className='document-card-flex-row'>
                {
                    chosenDocument().map(document=>{
                        return (
                            <div className='document-card-flex-row'>
                                <div className='document-card-container document-card-flex-column'>
                                <img src={document.image_link}></img>
                                </div>
                                
                                <DocumentCard
                                    title={document.name}
                                    author={document.brand} 
                                    yearPublished={document.id}
                                    publisher={document.product_type}
                                    docISBN={document.id}
                                />

                                <div className='document-card-container document-card-flex-column'>
                                    <IconButton aria-label="download"><GetAppIcon/></IconButton>
                                    <IconButton aria-label="edit"><EditIcon/></IconButton>
                                    <IconButton aria-label="save"><SaveIcon/></IconButton>
                                </div>
                            </div>
                        )

                    })
                }
            </div>
    )
}

export default ManageDocument