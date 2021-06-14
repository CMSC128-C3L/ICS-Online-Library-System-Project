import React, {useContext, useCallback, useState, useEffect} from 'react'
import { useDropzone } from 'react-dropzone'
import { PosterContext } from '../PosterContext'
import Button from '@material-ui/core/Button'
import './Modal.css'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { UserContext } from './Modal'

function UploadPoster({document}) {

    const {poster, setPoster} = useContext(PosterContext)
    const [tempPoster, setTempPoster] = useState([])
    const {user, close} = useContext(UserContext)
    const [error, setError] = useState('')

    const isPDF = (acceptedFile) =>{
        if(acceptedFile[0].type === 'application/pdf') return true;
        else return false;
    } 
    const onDrop = useCallback((acceptedFile) =>{

        if(isPDF(acceptedFile)) {
            setTempPoster(acceptedFile)
            console.log("pdf accepted")
        }
        else return setError('File type not supported. Please only upload PDF files.')
       
    }, []);

    const handleCancel = () => close()
    const handleSave = () =>{
        setPoster(tempPoster)
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
                    <Button variant="contained" color="primary" startIcon={<CloudUploadIcon/>}>BROWSE FILES</Button>
                </div>
                
            </div>

            <div className="file-status">
                <p className="error">{error}</p>
                <h3 className="upload-title">New File:</h3>
                {tempPoster.length > 0 ? (<p className="text">{tempPoster[0].name}</p>) : (<p className="text">None</p>)}

                <h3 className="upload-title">Current Uploaded File:</h3>
                {document.file !== undefined ? (<p className="text">{document.poster}</p>) : (<p className="text">None</p>)}
            </div>

            <div className="confirm-cancel">
            <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
            <Button variant="contained" color="secondary" style={{marginLeft: "1%"}} onClick={handleCancel}>Cancel</Button>
            </div>
        </div>
    )
}



export default UploadPoster
