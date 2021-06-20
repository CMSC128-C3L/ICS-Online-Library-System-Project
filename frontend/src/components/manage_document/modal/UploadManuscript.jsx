import React, {useContext, useCallback, useState, useEffect} from 'react'
import { useDropzone } from 'react-dropzone'
import { ManuscriptContext } from '../ManuscriptContext'
import Button from '@material-ui/core/Button'
import './Modal.css'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { UserContext } from './Modal'

function UploadManuscript({document}) {

    const {manus, setManus} = useContext(ManuscriptContext)
    const [tempManus, setTempManus] = useState([])
    const {user, close} = useContext(UserContext)
    const [error, setError] = useState('')

    const isPDF = (acceptedFile) =>{
        if(acceptedFile[0].type === 'application/pdf') return true;
        else return false;
    } 
    const onDrop = useCallback((acceptedFile) =>{
        if(isPDF(acceptedFile)) setTempManus(acceptedFile)
        else return setError('File type not supported. Please only upload PDF files.')
    }, []);

    const handleCancel = () => close()
    const handleSave = () =>{
        setManus(tempManus)
        close()
    }

    const {getRootProps, getInputProps} = useDropzone({
        onDrop, multiple: false
    })
    return (
        <div className="upload-file-container">

            
            <div {...getRootProps()}>

                <input {...getInputProps()} />
                <div className="upload-zone">
                    <p className="text">Drag and drop files here...</p>
                    <Button variant="contained" style={{color: "white", backgroundColor: "#47abdb"}} startIcon={<CloudUploadIcon/>}>BROWSE FILES</Button>
                </div>
                
            </div>

            <div className="file-status">
                <p className="error">{error}</p>
                <h3 className="upload-title">New File:</h3>
                {tempManus.length > 0 ? (<p className="text">{tempManus[0].name}</p>) : (<p className="text">None</p>)}

                <h3 className="upload-title">Current Uploaded File:</h3>
                {document.manus !== undefined ? (<p className="text">{document.manus}</p>) : (<p className="text">None</p>)}
            </div>

            <div className="confirm-cancel">
            <Button variant="contained" style={{color: "white", backgroundColor: "#47abdb"}} onClick={handleSave}>Save</Button>
            <Button variant="contained" color="secondary" style={{marginLeft: "1%"}} onClick={handleCancel}>Cancel</Button>
            </div>
        </div>
    )
}

export default UploadManuscript
