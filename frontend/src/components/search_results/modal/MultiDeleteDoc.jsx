import React, {useContext, useState, useRef, useEffect} from 'react'
import Modal, { UserContext as ModalContext } from '../../manage_user_popup/Modal'
import ConfirmChange from '../../manage_user_popup/ConfirmChange'
import axios from 'axios'
import '../../manage_user_popup/styles.css'

function MultiDeleteDoc(props){

  const docs = props.selected
  const { close } = useContext(ModalContext)
  const confirmModal = useRef(null)
  const [confirmed, setConfirmed] = useState(false)
  const handleConfirmation = () => {setConfirmed(true)}

  function handleDelete(){
    confirmModal.current.open(docs)
  }

  function handleCancel(){
    close()
  }

  // Do something once confirmed, then close modal
  useEffect(() => {
    if(confirmed){

      const deleteDoc = async (doc) =>{
        let typeRoute;
        try{
          let options = {
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
            params: {id: doc._id}
          }
          
          if(doc.type === "Book") typeRoute = "books"
          else if(doc.type === "Thesis") typeRoute = "thesis"
          else typeRoute = "sp"

          const res = await axios.delete(`/api/${typeRoute}/${doc._id}`, options)


        }catch(e){
          console.log(e)
        }
      }

      // Delete docs
      docs.forEach((doc) => {
        deleteDoc(doc)
      })

      props.resetSelected() // reset selected array of docs
      props.getDocuments()  // update docs to trigger re-render of results
      close() // close modal
    }
  }, [confirmed, close, docs])

  return(
    <div className="popup-container multi-delete-user">
        <Modal ref={confirmModal}><ConfirmChange onConfirm={handleConfirmation}>Confirm Delete</ConfirmChange></Modal>
        <h3 className="text prompt">Are you sure you want to delete</h3>
        <h3 className="text prompt">{docs.length} {docs.length > 1 ? 'documents' : 'document'}</h3>
        <div className="delete-cancel">
            <button className="delete popup-btn" onClick={() => handleDelete(docs)}>Delete</button>
            <button className="cancel popup-btn" onClick={handleCancel}>Cancel</button>
        </div>
        <p></p>
    </div>
  )
}

export default MultiDeleteDoc