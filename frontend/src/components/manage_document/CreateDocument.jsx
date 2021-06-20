import React, { useState, useEffect, useRef, useContext} from 'react';
import {useDropZone} from 'react-dropzone';
import { useLocation } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import {Box} from "@material-ui/core";
import UploadIcon from '@material-ui/icons/Backup';
import SaveIcon from '@material-ui/icons/Save';
import ToggleButton from '@material-ui/lab/ToggleButton';
import Button from '@material-ui/core/Button';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {Multiselect} from 'multiselect-react-dropdown';
import Modal from './modal/Modal';
import SaveDocument from './modal/SaveDocument';
import './DocumentCard.css';
import { useForm } from 'react-hook-form';
import {classification, course, topics} from './Choices.jsx'

import { FileContext } from './FileContext';
import { PosterContext } from './PosterContext'
import {BookCoverContext} from './BookCoverContext';
import UploadBookCover from './modal/UploadBookCover';
/**
 * functional component
 * conditionally render the input attributes according to document type
 * onHandleType and onSelect handles multi drop down options
 */

function CreateDocument(props){
  const classes = useStyles();
  const [doc_type, setDoctype] = useState([]);
  const [cover, setCover] = useState([]);
  const [uploadToggle, setUploadToggle] = useState('file')
  const [poster, setPoster] = useState([]);
  const [file, setFile] = useState([])
  const [selectedValue, setSelectedValue] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState([]);

  //for testing validation 
  const { register, handleSubmit, getValues, control, formState: { errors } } = useForm();

  // Create reference to modal
  const saveModal = useRef(null)
  const openSaveModal = (user, props) => {saveModal.current.open(user, props)}
  const uploadCoverModal = useRef(null);
  const openCoverModal = () => {uploadCoverModal.current.open(props)};
  const uploadFileModal = useRef(null);
  const openFileModal = () => {uploadFileModal.current.open(props)}
  const uploadPosterModal = useRef(null);
  const openPosterModal = () => {uploadPosterModal.current.open(props)}

  const displayFileName = (fileName) =>{
    return fileName.split('\\').pop();
  }

  // section to initialize book/sp/thesis
  let book = {
    type: getValues("controlledSelect"),
    id: getValues("ID"),
    title: getValues("Title"),
    year: getValues("Year"),
    author:getValues("Author"),
    publisher: getValues("Publisher"),
    isbn: getValues("ISBN"),
    description: getValues("Description")
  };

  let thesis = {
    type: getValues("controlledSelect"),
    id: getValues("THESIS_ID"),
    title: getValues("THESIS_Title"),
    adviser: getValues("THESIS_Adviser"),
    author: getValues("THESIS_Author"),
    pub_date: getValues("THESIS_Date"),
    journal: getValues("THESIS_Journal"),
    poster: getValues("THESIS_Poster"),
    source_code: getValues("THESIS_Source_Code"),
    abstract: getValues("THESIS_Abstract"),
    topic: "",
    course: ""
  };

  let sp = {
    type: getValues("controlledSelect"),
    id: getValues("SP_ID"),
    title: getValues("SP_Title"),
    adviser: getValues("SP_Adviser"),
    author: getValues("SP_Author"),
    pub_date: getValues("SP_Date"),
    journal: getValues("SP_Journal"),
    poster: getValues("SP_Poster"),
    source_code: getValues("SP_Source_Code"),
    abstract: getValues("SP_Abstract"),
    topic: [],
    course: []
  };

// for getting document type value
const handleType  = (selectedItem)  =>{
  setSelectedValue(selectedItem);
  
  
  if(selectedValue=="Book") {
    setDoctype("book")
    book.type = selectedValue;
  }
  else if(selectedValue=="Special Problem"){
    setDoctype("sp")
    sp.type = selectedValue;
  } 
  else if(selectedValue=="Thesis") {
    setDoctype("thesis")
    thesis.type = selectedValue;
  } else setDoctype("")
}

const selectTopic  = (selectedItem)  =>{
  // method for assigning the topic of document
  setSelectedTopic(selectedItem);
  
}

const selectCourse  = (selectedItem)  =>{
  // method for assigning the course object of document
  setSelectedCourse(selectedItem);
  
}

// useEffect for handling changes in tags input
useEffect(() => {
  handleType(selectedValue)
  selectTopic(selectedTopic)
  selectCourse(selectedCourse)
}, [selectedValue, selectedTopic, selectedCourse])

const handleUploadToggle = (event, newToggle) =>{
  setUploadToggle(newToggle);
  console.log('upload toggle: ', newToggle);
}

  return(
    <div className="browsebg browsebg-container">
      {
        <div> 
            <BookCoverContext.Provider value={{cover, setCover}}>
            <FileContext.Provider value={{file, setFile}}>
            <PosterContext.Provider value={{poster, setPoster}}>
            <Modal ref={saveModal}><SaveDocument book={book} sp={sp} thesis={thesis} course={selectedCourse} topic={selectedTopic} type={doc_type}/></Modal>
            <Modal ref={uploadCoverModal}><UploadBookCover document={document} /></Modal>
            

            <div className='document-card-flex-row'>         
                {/* document attributes are editable*/}
                <div className='document-card-container document-card-flex-column' key={""}>
                  <div className="main-text-tags">Classification: 
                  <Multiselect 
                      id = "doctype"
                      selectionLimit="1"
                      placeholder="Document Type"
                      options={classification} 
                      closeIcon="cancel"
                      isObject={false} 
                      onSelect={(selectedValue)=> handleType(selectedValue)} 
                      onRemove={(selectedValue)=> handleType(selectedValue)}   
                      style= { {searchBox: { border: "none", "borderBottom": "1px solid lightGray", "borderRadius": "0px", width: '100%' }} } 
                      />
                  </div>
                  
                  {(function(doc_type){
                        switch(doc_type){
                            case "book": //input section for book attributes
                                return(
                                    <div>
                                      <div className="main-text-tags">ID: <input type="number" className="input-container" placeholder="ID"  {...register("ID", {required: true, min: 1})}/>  </div>
                                      {errors.ID && <div className="warning">ID field is required</div>}
                                      <div className="main-text-tags">Title: <input type="text" className="input-container"  placeholder="Title"  {...register("Title", {required: true, min: 1})} /> </div>
                                      {errors.Title && <div className="warning">Title field is required</div>}
                                      <div className="main-text-tags">Author: <input type="text" className="input-container" placeholder="Author"  {...register("Author", {required: true, min: 1})} /> </div>
                                      {errors.Author && <div className="warning">Author field is required</div>}
                                      <div className="main-text-tags">Year: <input type="number" className="input-container" placeholder="Year"  {...register("Year",  {required: true, min: 1700, max: 2021})} /> </div>
                                      {errors.Year && <div className="warning">Year field is required</div>}
                                      <div className="main-text-tags">Publisher: <input type="text" className="input-container" placeholder="Publisher"  {...register("Publisher", {required: true, min: 1})} /> </div>
                                      {errors.Publisher && <div className="warning">Publisher field is required</div>}
                                      <div className="main-text-tags">ISBN: <input type="text" className="input-container" placeholder="ISBN"  {...register("ISBN", {required: true, min: 1})} /> </div>
                                      {errors.ISBN && <div className="warning">ISBN field is required</div>}

                                      {/* This section is for course tags of the document */}
                                      <div className="main-text-tags">Courses:</div>
                                      <Multiselect 
                                          id = {book.id}
                                          placeholder="Add a course"
                                          options={course} 
                                          closeIcon="cancel"
                                          isObject={false}
                                          onSelect={(selectedValue)=> selectCourse(selectedValue)} 
                                          onRemove={(selectedValue)=> selectCourse(selectedValue)}   
                                          style= { {searchBox: { border: "none", "borderBottom": "1px solid lightGray", "borderRadius": "0px", width: '100%' }} } 
                                      />

                                      {/* This section is for topic of the document */}
                                      <div className="main-text-tags">Tags:</div>
                                      <Multiselect 
                                          id = {book.id}
                                          placeholder="Add a topic"
                                          options={topics} 
                                          closeIcon="cancel"
                                          isObject={false}
                                          onSelect={(selectedValue)=> selectTopic(selectedValue)} 
                                          onRemove={(selectedValue)=> selectTopic(selectedValue)}      
                                          style= { {searchBox: { border: "none", "borderBottom": "1px solid lightGray", "borderRadius": "0px", width: '100%' }} } 
                                      />
                                    </div>
                                )
                              case "sp": //input section for sp attributes
                                return(
                                  <div>
                                    <div className="main-text-tags">ID: <input  className="input-container" type="number"  placeholder="ID" {...register("SP_ID", {required: true, min: 1})}/> </div>
                                    {errors.SP_ID && <div className="warning">ID field is required</div>}
                                    <div className="main-text-tags">Title: <input  className="input-container"  type="text" placeholder="Title" {...register("SP_Title", {required: true, min: 1})}/>  </div>
                                    {errors.SP_Title && <div className="warning">Title field is required</div>}
                                    <div className="main-text-tags">Author: <input className="input-container" type="text" placeholder="Author" {...register("SP_Author", {required: true, min: 1})}/> </div>
                                    {errors.SP_Author && <div className="warning">Author field is required</div>}
                                    <div className="main-text-tags">Adviser: <input className="input-container" type="text" placeholder="Adviser" {...register("SP_Adviser", {required: true, min: 1})}/>  </div>
                                    {errors.SP_Adviser && <div className="warning">Adviser field is required</div>}
                                    <div className="main-text-tags">Publishing Date: <input className="input-container" type="date" placeholder="Publishing Date" {...register("SP_Date", {required: true, min: 1})} /> </div>
                                    {errors.SP_Date && <div className="warning">Publishing Date field is required</div>}
                                    <div className="main-text-tags">Journal: <input className="input-container" name="sp_journal" type="text" placeholder="Journal" {...register("SP_Journal", {required: true, min: 1})} /> </div>
                                    {errors.SP_Journal && <div className="warning">Journal field is required</div>}
                                    <div className="main-text-tags">Poster: <input className="input-container" name="sp_poster" type="text" placeholder="Poster" {...register("SP_Poster", {required: true, min: 1})} /> </div>
                                    {errors.SP_Poster && <div className="warning">Poster field is required</div>}
                                    <div className="main-text-tags">Source Code: <input className="input-container" name="sp_source_code" type="text" placeholder="Source Code" {...register("SP_Source_Code", {required: true, min: 1})} /> </div>
                                    {errors.SP_Source_Code && <div className="warning">Source Code field is required</div>}

                                    {/* This section is for course of the document */}
                                    <div className="main-text-tags">Courses:</div>
                                    <Multiselect 
                                        id = {sp.id}
                                        placeholder="Add a course"
                                        options={course} 
                                        closeIcon="cancel"
                                        isObject={false}
                                        onSelect={(selectedValue)=> selectCourse(selectedValue)} 
                                        onRemove={(selectedValue)=> selectCourse(selectedValue)}   
                                        style= { {searchBox: { border: "none", "borderBottom": "1px solid lightGray", "borderRadius": "0px", width: '100%' }} } 
                                    />

                                    {/* This section is for topic of the document */}
                                    <div className="main-text-tags">Tags:</div>
                                    <Multiselect 
                                        id = {sp.id}
                                        placeholder="Add a topic"
                                        options={topics} 
                                        closeIcon="cancel"
                                        isObject={false}
                                        onSelect={(selectedValue)=> selectTopic(selectedValue)} 
                                        onRemove={(selectedValue)=> selectTopic(selectedValue)}    
                                        style= { {searchBox: { border: "none", "borderBottom": "1px solid lightGray", "borderRadius": "0px", width: '100%' }} } 
                                    />
                                  </div>
                                )
                              case "thesis": //input section for thesis attributes
                                return(
                                  <div>
                                    <div className="main-text-tags">ID: <input  className="input-container" type="bumber"  placeholder="ID" {...register("THESIS_ID", {required: true, min: 1})}/> </div>
                                    {errors.THESIS_ID && <div className="warning">ID field is required</div>}
                                    <div className="main-text-tags">Title: <input  className="input-container"  type="text"  placeholder="Title" {...register("THESIS_Title", {required: true, min: 1})}/> </div>
                                    {errors.THESIS_Title && <div className="warning">Title field is required</div>}
                                    <div className="main-text-tags">Author: <input className="input-container" type="text" placeholder="Author" {...register("THESIS_Author", {required: true, min: 1})}/> </div>
                                    {errors.THESIS_Author && <div className="warning">Author field is required</div>}
                                    <div className="main-text-tags">Adviser: <input className="input-container" type="text" placeholder="Adviser" {...register("THESIS_Adviser", {required: true, min: 1})}/></div>
                                    {errors.THESIS_Adviser && <div className="warning">Adviser field is required</div>}
                                    <div className="main-text-tags">Publishing Date: <input className="input-container" type="date" placeholder="Publishing Date" {...register("THESIS_Date", {required: true, min: 1})}/> </div>
                                    {errors.THESIS_Date && <div className="warning">Publishing Date field is required</div>}
                                    <div className="main-text-tags">Journal: <input className="input-container" name="thesis_journal" type="text" placeholder="Journal" {...register("THESIS_Journal", {required: true, min: 1})}/> </div>
                                    {errors.THESIS_Journal && <div className="warning">Journal field is required</div>}
                                    <div className="main-text-tags">Poster: <input className="input-container" name="thesis_poster" type="text" placeholder="Poster" {...register("THESIS_Poster", {required: true, min: 1})}/> </div>
                                    {errors.THESIS_Poster && <div className="warning">Poster field is required</div>}
                                    <div className="main-text-tags">Source Code: <input className="input-container" name="thesis_source_code" type="text" placeholder="Source Code" {...register("THESIS_Source_Code", {required: true, min: 1})}/> </div>
                                    {errors.THESIS_Source_Code && <div className="warning">Source Code field is required</div>}

                                    {/* This section is for course of the document*/}
                                    <div className="main-text-tags">Courses:</div>
                                    <Multiselect 
                                        placeholder="Add a course"
                                        options={course} 
                                        closeIcon="cancel"
                                        isObject={false}
                                        onSelect={(selectedValue)=> selectCourse(selectedValue)} 
                                        onRemove={(selectedValue)=> selectCourse(selectedValue)}   
                                        style= { {searchBox: { border: "none", "borderBottom": "1px solid lightGray", "borderRadius": "0px", width: '100%' }} } 
                                    />

                                    {/* This section is for topic of the document */}
                                    <div className="main-text-tags">Tags:</div>
                                    <Multiselect 
                                        placeholder="Add a topic"
                                        options={topics} 
                                        closeIcon="cancel"
                                        isObject={false}
                                        onSelect={(selectedValue)=> selectTopic(selectedValue)} 
                                        onRemove={(selectedValue)=> selectTopic(selectedValue)}    
                                        style= { {searchBox: { border: "none", "borderBottom": "1px solid lightGray", "borderRadius": "0px", width: '100%' }} } 
                                    />
                                </div>
                                )
                            default: 
                              return null;
                        }
                    })(doc_type)}
                </div>

                {/* conditional render for buttons */}
                {(function(doc_type){
                        switch(doc_type){
                            case "book":  //button for upload pdf/thumbnail [book]
                                return(
                                  <div className='document-card-container button-card-flex-column'>
                                  <UploadIcon className={classes.iconStyle} style={{alignSelf:'center'}}/>
                                  <button className={classes.textStyle} onClick={() => openCoverModal()}>UPLOAD THUMBNAIL</button>
                                  <span style={{overflow: "hidden"}}>Book Cover: {cover.length === 0  ? <p>None</p> :  <p>{cover[0].name}</p>}</span>
                                  </div>
                                )
                            case "sp":  //button for upload pdf/poster [sp]
                                return(
                                  <div className="document-card-container uploads-container">
                                    <ToggleButtonGroup
                                    value={uploadToggle}
                                    exclusive
                                    className={classes.toggleStyle}
                                    onChange={handleUploadToggle}
                                    aria-label="text alignment"
                                    >
                                    <ToggleButton value="poster" className={classes.fontStyle} aria-label="left aligned">
                                      POSTER
                                    </ToggleButton>
                                    <ToggleButton value="file" className={classes.fontStyle} aria-label="centered">
                                      JOURNAL
                                    </ToggleButton>
                                    <ToggleButton value="manuscript" className={classes.fontStyle} aria-label="right aligned">
                                      MANUSCRIPT
                                    </ToggleButton>
                                    </ToggleButtonGroup>
                                  
                                    {uploadToggle === 'file' ? 
                                    (  <div className="upload-navigation">
                                      <h4>File</h4>
                                      <Button onClick={() => openFileModal()}>Select New File</Button>
                                      <p>Current File: {document.file === undefined || document.file === '' ? <p>None</p> : <p>{displayFileName(document.file)}</p>}</p>
                                    </div>) : 

                                    (<div className="upload-navigation">
                                      <h4>Poster</h4>
                                      <Button onClick={() => openPosterModal()}>Select New Poster</Button>
                                      <span style={{overflow: "hidden"}}>Current Uploaded Poster: {document.poster === undefined || document.poster === ''  ? <p>None</p> : <p>{displayFileName(document.poster)}</p>}</span>
                                    </div>)}
                                  </div>
                                )
                            case "thesis":  //button for upload pdf/poster [thesis]
                                return(
                                  <div className="document-card-container uploads-container">
                                    <ToggleButtonGroup
                                    value={uploadToggle}
                                    exclusive
                                    className={classes.toggleStyle}
                                    onChange={handleUploadToggle}
                                    aria-label="text alignment"
                                    >
                                    <ToggleButton value="poster" className={classes.fontStyle} aria-label="left aligned">
                                      POSTER
                                    </ToggleButton>
                                    <ToggleButton value="file" className={classes.fontStyle} aria-label="centered">
                                      JOURNAL
                                    </ToggleButton>
                                    <ToggleButton value="manuscript" className={classes.fontStyle} aria-label="right aligned">
                                      MANUSCRIPT
                                    </ToggleButton>
                                    </ToggleButtonGroup>
                                  
                                    {uploadToggle === 'file' ? 
                                    (  <div className="upload-navigation">
                                      <h4>File</h4>
                                      <Button onClick={() => openFileModal()}>Select New File</Button>
                                      <p>Current File: {document.file === undefined || document.file === '' ? <p>None</p> : <p>{displayFileName(document.file)}</p>}</p>
                                    </div>) : 

                                    (<div className="upload-navigation">
                                      <h4>Poster</h4>
                                      <Button onClick={() => openPosterModal()}>Select New Poster</Button>
                                      <span style={{overflow: "hidden"}}>Current Uploaded Poster: {document.poster === undefined || document.poster === ''  ? <p>None</p> : <p>{displayFileName(document.poster)}</p>}</span>
                                    </div>)}
                                  </div>
                                )
                            default:
                              return null
                        }
                    })(doc_type)
                  }
            </div>
                
            {/* descriptions/abstracts are editable*/}
            <div className="description-section">
                { 
                    (function(doc_type){
                        switch(doc_type){
                            case "thesis": //textarea section for thesis abstract
                              return(
                                <div className="document-card-container">
                                  <h2 style={{textAlign:'center'}}>ABSTRACT</h2>
                                  <Box className={classes.boxStyle}>
                                  <textarea className="textarea-container" cols="40" rows="5" {...register("THESIS_Abstract", {required: true})}></textarea>
                                  </Box>
                                  {errors.THESIS_Abstract && <div className="warning">Abstract field is required</div>}
                                </div>
                              )
                            case "sp": //textarea section for sp abstract
                              return(
                                <div className="document-card-container">
                                  <h2 style={{textAlign:'center'}}>ABSTRACT</h2>
                                  <Box className={classes.boxStyle}>
                                  <textarea className="textarea-container" name="sp_abstract"  cols="40" rows="5" {...register("SP_Abstract", {required: true})}></textarea>
                                  </Box>
                                  {errors.SP_Abstract && <div className="warning">Abstract field is required</div>}
                                </div>
                              )
                              case "book":  //textarea section for book description
                                return(
                                  <div className="document-card-container">
                                    <h2 style={{textAlign:'center'}}>DESCRIPTION</h2>
                                    <Box className={classes.boxStyle}>
                                    <textarea className="textarea-container" name="book_description"  cols="40" rows="5" {...register("Description", {required: true})} ></textarea>
                                    </Box>
                                    {errors.Description && <div className="warning">Description field is required</div>}
                                  </div>
                                )
                            default:
                              return null
                        }
                    })(doc_type)
                  }
                <div className = "button-right">
                  <button className={classes.saveStyle} onClick={handleSubmit(openSaveModal)}><SaveIcon className={classes.iconStyle}/></button>
                </div>
            </div>   
            </PosterContext.Provider>
            </FileContext.Provider>
            </BookCoverContext.Provider>
        </div>
    }
    </div>
  )
}

const useStyles = makeStyles(() => ({
  textStyle: {
      '&:hover': {
          color: "#47ABD8",
       },
      background:'transparent',
      padding: '0',
      color:'black',
      width: 'auto',
      'margin-left': '0',
      fontSize:'25px', 
      fontWeight:'bold', 
      border:'transparent',
      fontFamily:'Arial',
  },
  iconStyle: {
      '&:hover': {
          color: "#b3e5fc",
       },
      color:'black', 
      width:'5vh', 
      height:'5vh'
  },
  fontStyle: {
    '&:hover': {
        color: "white",
     },
    color: 'black'
  },
  toggleStyle:{ 
    backgroundColor: '#95d2ec', 
    color:'white'
  },
  saveStyle:{ 
      backgroundColor: '#47ABD8', 
      border:'transparent',
      borderRadius:'10vh', 
      width:'10vh', 
      height:'10vh'
  },
  boxStyle:{
    flexWrap: "wrap",
    wordWrap: "break-word",
    wordBreak: "break-all",
    maxWidth: "80em"
  },
  descriptionStyle:{
    flexWrap: "wrap",
    textAlign: 'center',
    paddingBottom:'5vh',
    wordWrap: "break-word",
    wordBreak: "break-all"
  },
  imageStyle:{
      width: '300px', 
      height: '500px', 
      objectFit: 'cover'
  }
}));

export default CreateDocument;
