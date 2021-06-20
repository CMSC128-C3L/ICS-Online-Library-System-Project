import React, {useContext, useCallback, useState, useEffect} from 'react'
import { useDropzone } from 'react-dropzone'
import { BookCoverContext } from '../BookCoverContext'
import Button from '@material-ui/core/Button'
import './Modal.css'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { UserContext } from './Modal'


function UploadBookCover({document}) {

    const {cover, setCover} = useContext(BookCoverContext)
    const [tempCover, setTempCover] = useState([])
    const {user, close} = useContext(UserContext)
    const [error, setError] = useState('')

    const isImage = (acceptedFile) =>{
        if(acceptedFile[0].type === 'image/jpeg' || acceptedFile[0].type === 'image/png') return true;
        else return false;
    } 
    const onDrop = useCallback((acceptedFile) =>{
        if(isImage(acceptedFile)) setTempCover(acceptedFile)
        else return setError('File type not supported. Please only upload JPG/JPEG or PNG file.')
    }, []);

    const handleCancel = () => close()
    const handleSave = () =>{
        setCover(tempCover)
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
                {tempCover.length > 0 ? (<p className="text">{tempCover[0].name}</p>) : (<p className="text">None</p>)}

                <h3 className="upload-title">Current Uploaded File:</h3>
                {document.cover !== undefined ? (<p className="text">{document.cover}</p>) : (<p className="text">None</p>)}
            </div>

            <div className="confirm-cancel">
            <Button variant="contained" style={{color: "white", backgroundColor: "#47abdb"}} onClick={handleSave}>Save</Button>
            <Button variant="contained" color="secondary" style={{marginLeft: "1%"}} onClick={handleCancel}>Cancel</Button>
            </div>
        </div>
    )
}

export default UploadBookCover