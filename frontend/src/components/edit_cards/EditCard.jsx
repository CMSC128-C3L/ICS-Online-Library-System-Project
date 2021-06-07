import React, { useState } from 'react'
import Card from '../cards/Card'
import './EditCards.css'

function EditCard({ card }){
    const [content, setContent] = useState(card);
    let link = ''; // temporary link setter

    const handleDescriptionChange = (e) => {
        console.log('eyyy')
    }

    return(
        <div class="grid-2">
            <div className="grid-cell grid-card">
                <Card content={card}></Card>
            </div>

            <div className="grid-cell container">
                <form className="flex-col">

                    <div className="form-section">
                        <label for="description" className="form-label text">Description</label>
                        <textarea name="description" rows="4" className="textarea"></textarea>
                    </div>

                    <div className="form-section">
                        <label for="link" className="form-label text">Link</label>
                        <textarea name="link" rows="2" className="textarea"></textarea>
                    </div>

                    <div className="form-section form-upload">
                        <label for="upload" className="form-label text">Upload photo:</label>
                        <button name="upload" className="btn upload-btn">Select file</button>
                    </div>

                    <div className="form-section buttons">
                        <button className="btn save-btn">SAVE</button>
                        <button className="btn cancel-btn">CANCEL</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default EditCard