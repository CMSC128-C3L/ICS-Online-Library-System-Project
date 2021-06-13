import React, {useContext, useCallback, useState, useEffect} from 'react'
import { useDropzone } from 'react-dropzone'
import { FileContext } from '../FileContext'
import Button from '@material-ui/core/Button'
import './Modal.css'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { UserContext } from './Modal'

function UploadFile({document}) {

    const {file, setFile} = useContext(FileContext)
    const [tempFile, setTempFile] = useState(file)
    const {user, close} = useContext(UserContext)

    const onDrop = useCallback((acceptedFile) =>{
        setTempFile(acceptedFile)
       
    }, []);

    const handleCancel = () => close()
    const handleSave = () =>{

        
        setFile(tempFile)
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

                <h3 className="upload-title">New File:</h3>
                {tempFile.length > 0 ? (<p className="text">{tempFile[0].name}</p>) : (<p className="text">None</p>)}

                <h3 className="upload-title">Current Uploaded File:</h3>
                {document.file !== undefined ? (<p className="text">{document.name}</p>) : (<p className="text">None</p>)}
            </div>

            <div className="confirm-cancel">
            <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
            <Button variant="contained" color="secondary" style={{marginLeft: "1%"}} onClick={handleCancel}>Cancel</Button>
            </div>
        </div>
    )
}

function FileDetail({file}){

}

export default UploadFile
