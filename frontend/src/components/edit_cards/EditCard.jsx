import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Card from '../cards/Card'
import './EditCards.css'

function EditCard({ card }){
    const [content, setContent] = useState(card);
    let history = useHistory();

    // TODO: Save changes
    const handleContentChange = (e) => {
        console.log('eyyy')
    }

    const handleCancelButton = (e) => {
        history.push("/adminHome/manageAnnouncements")
    }

    return(
        // TODO: Add dropdown for change announcement classification (Advisory/Featured/ICS News)
        <div className="grid-2">
            <div className="grid-cell grid-card">
                <Card content={card}></Card>
            </div>

            <div className="grid-cell container">
                <form className="flex-col">

                    <div className="form-section">
                        <label htmlFor="description" className="form-label text">Description</label>
                        <textarea name="description" rows="4" className="textarea"></textarea>
                    </div>

                    <div className="form-section">
                        <label htmlFor="link" className="form-label text">Link</label>
                        <textarea name="link" rows="2" className="textarea"></textarea>
                    </div>

                    <div className="form-section form-upload">
                        <label htmlFor="upload" className="form-label text">Upload photo:</label>
                        <input id="upload-btn" className="btn upload-btn" text="Upload" type="file" id="img" name="img" accept="image/*"/>
                    </div>

                    <div className="form-section buttons">
                        <button className="btn save-btn">SAVE</button>
                        <button type="cancel" className="btn cancel-btn" onClick={handleCancelButton}>CANCEL</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default EditCard