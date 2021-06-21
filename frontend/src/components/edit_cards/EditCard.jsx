import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import Card from '../cards/Card'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import './EditCards.css'

function EditCard({ card }){
    const classes = useStyles()
    const [content, setContent] = useState(card);
    let history = useHistory();

    // To track temporary changes to be put in display
    const [title, setTitle] = useState(card.title)
    const [header, setHeader] = useState(card.header)
    const [description, setDescription] = useState(card.description)
    const [link, setLink] = useState(card.link)
    const [displayImage, setDisplayImage] = useState(card.image)
    const [updated, setUpdated] = useState(false)

    // To track changes needed for saving
    const [imageToUpload, setImageToUpload] = useState()
    const [fieldChanged, setFieldChanged] = useState(false)

    // To save updated announcement details
    const handleSave = (e) => {
        e.preventDefault()
        const updateCard = async () => {
            try{
                let options =  {
                    headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}, 
                    params: {id: content._id},
                }
                const res = await axios.patch(`/api/advisory/${content._id}`, 
                    {
                        "header": content.header,
                        "title": content.title,
                        "description": content.description,
                        "link": content.link,
                    },
                    options) 
               
            }catch(e){
                console.log(e)
                
            }
        }

        // Place image file to upload in a FormData and send as part of request
        const uploadImg = async () => {
            const formData = new FormData()
            formData.append('home_advisory', imageToUpload)

            try{
                let imgOptions = {
                    headers: {'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'multipart/form-data'},
                    params: {id: content._id}
                }
                const res = await axios.post(`/api/advisory/uploads/${content._id}`,
                    formData,
                    imgOptions)
                
            }catch(e){
                console.log(e)
            }

        }
        
        // Send requests depending if field and/or image changed
        if(fieldChanged) updateCard()
        if(imageToUpload) uploadImg()
        history.push("/adminHome/manageAnnouncements")
    }
    
    const handleCancelButton = (e) => {
        history.push("/adminHome/manageAnnouncements")
    }
    
    const handleUpload = (e) => {
        setDisplayImage(URL.createObjectURL(e.target.files[0]))
        setImageToUpload(e.target.files[0])
        setUpdated(true)
    }

    const handleClear = (e) => {
        e.preventDefault();
        setTitle("");
        setDescription("");
        setLink("");
    }

    // To update content and reflect changes in card
    useEffect(() => {
        setFieldChanged(true)
        setContent((prev)=> {
            return {
                ...prev,
                header: header,
                title: title,
                description, description,
                image: displayImage,
                link: link,
                updated: updated
            }
        })
    }, [header, title, description, link, displayImage])

    return(
        <div className="grid-2 margin-v">
            <div className="grid-cell grid-card">
                <Card content={content}></Card>
            </div>

            <div className="grid-cell container">
                <form className="flex-col">

                    <button className="clear-btn" onClick={handleClear} target="_blank">
                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M24 21h-17l-7-7.972 7-8.028h17v16zm-16.09-14l-5.252 6.023 5.247 5.977h14.095v-12h-14.09zm6.09 4.586l2.586-2.586 1.414 1.414-2.586 2.586 2.586 2.586-1.414 1.414-2.586-2.586-2.586 2.586-1.414-1.414 2.586-2.586-2.586-2.586 1.414-1.414 2.586 2.586z"/></svg>
                    </button>

                    <div className="form-section type-dropdown">
                        <label htmlFor="description" className="form-label text">Type</label>
                        <FormControl style={{height:'40px'}} className={classes.formControl}>    
                            <Select
                                native
                                value={content.header}
                                className={classes.dropdown}
                                onChange={(e)=> setHeader(e.target.value)}
                            >
                            <option aria-label="Current" value={content.header} className={classes.selected}>{content.header ? content.header.toUpperCase() : ""}</option>
                            {["Advisory", "News", "Featured"].map((header) => {
                                return(
                                    header !== content.header? 
                                    <option key={header} value={header} className={classes.option}>{header.toUpperCase()}</option> :
                                    null
                                )
                            })}
                            </Select>
                        </FormControl>

                    </div>
                    
                    <div className="form-section">
                        <label htmlFor="title" className="form-label text">Title</label>
                        <textarea name="title" rows="2" className="textarea" value={title} onChange={(e)=> setTitle(e.target.value)}></textarea>
                    </div>

                    <div className="form-section">
                        <label htmlFor="description" className="form-label text">Description</label>
                        <textarea name="description" rows="4" className="textarea" value={description} onChange={(e)=> setDescription(e.target.value)}></textarea>
                    </div>

                    <div className="form-section">
                        <label htmlFor="link" className="form-label text">Link</label>
                        <textarea name="link" rows="2" className="textarea" value={link} onChange={(e)=> setLink(e.target.value)}></textarea>
                    </div>

                    <div className="form-section form-upload">
                        <label htmlFor="upload" className="form-label text">Upload photo:</label>
                        <input id="upload-btn" className="btn upload-btn" text="Upload" type="file" name="img" accept="image/*" onChange={(e)=> handleUpload(e)} />
                    </div>

                    <div className="form-section buttons">
                        <button className="btn save-btn" onClick={handleSave}>SAVE</button>
                        <button type="cancel" className="btn cancel-btn" onClick={handleCancelButton}>CANCEL</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: '0em 1em',
        padding: '0em 1em',
        backgroundColor: '#47abd8',
        borderRadius: '1em',
        fontSize: '1.5em'
    },
    dropdown: {
        color: 'white',
        fontWeight: 'bold',
        letterSpacing: '0.075em',
        fontSize: '0.8em'
    },
    option: {
        color: 'black'
    },
    selected: {
        fontWeight: 'bold',
        color: 'black'
    }
}))

export default EditCard