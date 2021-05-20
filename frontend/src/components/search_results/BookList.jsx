import React, {useState, useEffect} from 'react'
import axios from 'axios'
import BookCard from './BookCard';

function BookList(props) {
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
            <div className='flex-row'>
                {
                    chosenDocument().map(document=>{
                        return <BookCard 
                                thumbnail={document.image_link}
                                title={document.name}
                                header={document.id}
                            />
                    })
                }
            </div>
    )
}

export default BookList