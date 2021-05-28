import React, {useContext, useState, useRef, useEffect} from 'react'
import Modal, { UserContext } from './Modal'
import { useParams } from 'react-router'
import ConfirmChange from './ConfirmChange'
import axios from 'axios'
import './styles.css'

function SaveDocument({ children }){
    // const {user, close} = useContext(UserContext)
    const {id, close} = useParams();
    const confirmModal = useRef(null)
    const [document, setDocument] = useState("")
    const [confirmed, setConfirmed] = useState(false)
    const handleConfirmation = () => {setConfirmed(true)}

    function handleSave(){
        confirmModal.current.open()
    }

    function handleCancel(){
        close()
    }


  //get the specific document data 
  const saveDocument = async() =>{
        try{
            const document = await axios.get(`/api/books/${id}`);
            console.log(document.data);
            setDocument(document.data);
        }catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        saveDocument()
    }, [])

    // do something here if confirmed then close modal
    useEffect(() => {
        if(confirmed){
            saveDocument()
            close()
        }
    }, [confirmed, close])

    return(
        <div className="save-user popup-container">
            <Modal ref={confirmModal}><ConfirmChange onConfirm={handleConfirmation}>Confirm edit</ConfirmChange></Modal>
            <h3 className="text prompt">Save changes to {document.title}</h3>
            <div className="save-cancel">
                <button className="save popup-btn" onClick={() => handleSave()}>Save</button>
                <button className="cancel popup-btn" onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    )
}

export default SaveDocument