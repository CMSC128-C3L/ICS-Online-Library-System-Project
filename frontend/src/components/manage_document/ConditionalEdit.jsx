import React, {useMemo, useState, useEffect, useRef, useContext} from 'react';
import {useDropZone} from 'react-dropzone';
import { useLocation } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from 'react-router';
import {Box} from "@material-ui/core";
import axios from 'axios';
import DownloadIcon from '@material-ui/icons/GetApp';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import UploadIcon from '@material-ui/icons/Backup';
import DocumentCard from './DocumentCard';
import Modal from './modal/Modal';
import UpdateDocument from './modal/UpdateDocument';
import {Multiselect} from 'multiselect-react-dropdown';
import './DocumentCard.css';
import { UserContext } from '../user/UserContext'
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ViewPDF from "./ViewPDF";
import {classification, course, topics} from './Choices.jsx'
import { FileContext } from './FileContext';
import { PosterContext } from './PosterContext'
import UploadFile from './modal/UploadFile';
import UploadPoster from './modal/UploadPoster';
import Button from '@material-ui/core/Button'
import decode from 'jwt-decode';
import {BookCoverContext} from './BookCoverContext';
import { ManuscriptContext } from './ManuscriptContext';
import UploadBookCover from './modal/UploadBookCover';
import path from 'path';
import UploadManuscript from './modal/UploadManuscript';

/**
 * functional component
 * conditionally allow edit on documents depending on the button clicked from admin view
 * onChange triggers update from functions stated in manage document 
 */

function ConditionalEdit(props){
  const classes = useStyles();
  const [document, setDocument] = useState([]);
  const {id} = useParams();
  const [selectedValue, setSelectedValue] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [cover, setCover] = useState([]);
  const {loggedUser, setLoggedUser} = useContext(UserContext); 
  const [uploadToggle, setUploadToggle] = useState('file')
  const [poster, setPoster] = useState([]);
  const [manus, setManus] = useState([]);

  // const {file, setFile} = useContext(FileContext)
  const [file, setFile] = useState([])
  const uData = (localStorage.length != 0) ? decode(localStorage.getItem('token')) : '{}';
  // console.log("udata:" , uData)
  
  // Create reference to modal
  const saveModal = useRef(null)
  const openSaveModal = (user, props) => {saveModal.current.open(user, props)}
  const uploadFileModal = useRef(null);
  const openFileModal = () => {uploadFileModal.current.open(props)}
  const uploadPosterModal = useRef(null);
  const openPosterModal = () => {uploadPosterModal.current.open(props)}
  const uploadCoverModal = useRef(null);
  const openCoverModal = () => {uploadCoverModal.current.open(props)}
  const uploadManusModal = useRef(null);
  const openManusModal = () => {uploadManusModal.current.open(props)}
  //get flag whether the edit button from manage document is clicked
  let location = useLocation();
  let allowEdit, doc_type;

  if(location.state != undefined) {
    allowEdit = location.state.fromButtonEdit;
    doc_type = location.state.type;
  } else {
    doc_type = "";
    allowEdit = false;
  }

  const getCourseCode = (data) => {
    return data.code;
  }


  //get the specific document data 
  const getDocument = async() =>{
    let document;
    let options;
    if(uData === '{}'){//empty
      options =  {}
    }else{//not empty
      options =  {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}, }
    }
    
    try{
        if(doc_type == "book") document = await axios.get(`/api/books/${id}`, options);
        else if(doc_type == "sp"){
          document = await axios.get(`/api/sp/${id}`, options);
          let courses = document.data.courses.map(getCourseCode);
          document.data.courses = courses;
        }
        else if(doc_type == "thesis"){
          document = await axios.get(`/api/thesis/${id}`, options);
          let courses = document.data.courses.map(getCourseCode);
          document.data.courses = courses;
        }


        setDocument(document.data); 
        console.log("data:\n", document.data)
        const log = await axios.patch('/api/log/doc/'+uData.user_id,{doc_id:id});
    }catch(e){
        console.log(e)
    }
}

  const displayFileName = (fileName) =>{
    return fileName.split('\\').pop();
  }

  const downloadPoster = async() =>{
    let options =  {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}, }
 
    try{
      if(doc_type === "thesis") {
        let popUp = window.open("http://localhost:5000/api/thesis/download/0/"+localStorage.getItem('token')+"/"+id, '_parent');
      }else if(doc_type === "sp"){
        let popUp = window.open("http://localhost:5000/api/sp/download/0/"+localStorage.getItem('token')+"/"+id, '_parent');
      }
    }catch(e){
      console.log(e)
    }
  }

  const downloadJournal = async() =>{
    let options =  {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}, }
 
    try{
      if(doc_type === "thesis") {
        let popUp = window.open("http://localhost:5000/api/thesis/download/1/"+localStorage.getItem('token')+"/"+id, '_parent');
      }else if(doc_type === "sp"){
        let popUp = window.open("http://localhost:5000/api/sp/download/1/"+localStorage.getItem('token')+"/"+id, '_parent');
      }
    }catch(e){
      console.log(e)
    }
  }

  const downloadFile = async() =>{
    let options =  {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}, }
 
    try{
      if(doc_type === "thesis") {
        let popUp = window.open("http://localhost:5000/api/thesis/download/2/"+localStorage.getItem('token')+"/"+id, '_parent');
      }else if(doc_type === "sp"){
        let popUp = window.open("http://localhost:5000/api/sp/download/2/"+localStorage.getItem('token')+"/"+id, '_parent');
      }
    }catch(e){
      console.log(e)
    }
  }

  const getPath = (pdfFile) =>{
    try{
      console.log("PDF ",pdfFile);
      let path_array = pdfFile.split('/');
      if(path_array.length == 1){ //delimiter must be '\'
        path_array = pdfFile.split('\\');
      }
      let path;
      if(path_array[0] === 'uploads'){
        path = 'http://localhost:3000/static/'+path_array[2];
      }else{
        path = pdfFile;
      }
      console.log("PATH", path);
      return path;
    }catch (err){
      //MAY ERROR
    }
  }



  useEffect(() => {
      getDocument()
  }, [])

  const [book, setBook] = useState({
    title: "",
    year: "",
    author: "",
    publisher: "",
    isbn: "",
    description: "",
    courses: "",
    topic: ""
  })

  const [thesis, setThesis] = useState({
    title: "",
    adviser: "",
    author: "",
    pub_date: "",
    abstract: "",
    courses: "",
    topic: "",
    code:"",
    journal: "",
    manuscript: "",
    poster: "",
    file: ""
  })

  const [sp, setSP] = useState({
    title: "",
    adviser: "",
    author: "",
    pub_date: "",
    abstract: "",
    courses: "",
    topic: "",
    code:"",
    journal: "",
    manuscript: "",
    poster: "",
    file: ""
  })

  const [selectedTopic, setSelectedTopic] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState([]);

  useEffect(() => {
    setSelectedTopic(document.topic)
    
    if(doc_type=="book") {setBook({ ...book, 
      title: document.title,
      year: document.year,
      author: document.author,
      publisher: document.publisher,
      isbn: document.isbn,
      description: document.description,
      courses: document.course_code,
      topic: document.topic
    })
    setSelectedCourse(document.course_code)
    }
    else if(doc_type=="sp") {setSP({ ...sp, 
      title: document.title,
      adviser: document.adviser,
      author: document.author,
      pub_date: document.pub_date,
      abstract: document.abstract,
      courses: document.courses,
      topic: document.topic,
      code: document.source_code,
      journal: document.journal,
      manuscript: document.manuscript,
      poster: document.poster,
      file: document.file
    })
    setSelectedCourse(document.courses)
    }
    else if(doc_type=="thesis") {setThesis({ ...thesis, 
      title: document.title,
      adviser: document.adviser,
      author: document.author,
      pub_date: document.pub_date,
      abstract: document.abstract,
      courses: document.courses,
      topic: document.topic,
      code: document.source_code,
      journal: document.journal,
      manuscript: document.manuscript,
      poster: document.poster,
      file: document.file
    })
    setSelectedCourse(document.courses)
    }
  }, [document])


  const handleInputChange = async(event) =>{
    const target = event.target;

    if(doc_type=="book"){
      if(target.name==="book_title") book.title = target.value;
      else if(target.name==="book_author") book.author = target.value;
      else if(target.name==="book_year") book.year = target.value;
      else if(target.name==="book_publisher") book.publisher = target.value;
      else if(target.name==="book_isbn") book.isbn = target.value;
      else if(target.name==="book_description") book.description = target.value;
    } 

    else if(doc_type=="thesis"){
      if(target.name==="thesis_title") thesis.title = target.value;
      else if(target.name==="thesis_author") thesis.author = target.value;
      else if(target.name==="thesis_adviser") thesis.adviser = target.value;
      else if(target.name==="thesis_pub_date") thesis.pub_date = target.value;
      else if(target.name==="thesis_journal") thesis.journal = target.value;
      else if(target.name==="thesis_poster") thesis.poster = target.value;
      else if(target.name==="thesis_manuscript") thesis.manuscript = target.value;
      else if(target.name==="thesis_source_code") thesis.source_code = target.value;
      else if(target.name==="thesis_abstract") thesis.abstract = target.value;
    }

    else if(doc_type=="sp"){
      if(target.name==="sp_title") sp.title = target.value;
      else if(target.name==="sp_author") sp.author = target.value;
      else if(target.name==="sp_adviser") sp.adviser = target.value;
      else if(target.name==="sp_pub_date") sp.pub_date = target.value;
      else if(target.name==="sp_journal") sp.journal = target.value;
      else if(target.name==="sp_manuscript") sp.manuscript = target.value;
      else if(target.name==="sp_poster") sp.poster = target.value;
      else if(target.name==="sp_source_code") sp.source_code = target.value;
      else if(target.name==="sp_abstract") sp.abstract = target.value;
    }
}

  // for tags input value
  const selectTopic  = (selectedItem)  =>{
    setSelectedTopic(selectedItem);
    
    if(doc_type=="book") book.topic = selectedTopic
    else if(doc_type=="sp") sp.topic = selectedTopic
    else if(doc_type=="thesis") thesis.topic = selectedTopic
  }

  const selectCourse  = (selectedItem)  =>{
    // method for assigning the course object of document
    setSelectedCourse(selectedItem);

    if(doc_type=="book") book.courses = selectedCourse
    else if(doc_type=="sp") sp.courses = selectedCourse
    else if(doc_type=="thesis") thesis.courses = selectedCourse
  }

  useEffect(() => {
    selectTopic(selectedTopic)
    selectCourse(selectedCourse)
    console.log(manus);
}, [selectedTopic, selectedCourse, manus])

const [view, setView] = useState('journal');

const handleView = (event, newToggle) => {
  setView(newToggle);
};

const handleUploadToggle = (event, newToggle) =>{
  setUploadToggle(newToggle);
}

  return(
    <div className="browsebg browsebg-container">
      
      <ManuscriptContext.Provider value={{manus, setManus}}>
      <FileContext.Provider value={{file, setFile}}>
      <PosterContext.Provider value={{poster, setPoster}}>
      <BookCoverContext.Provider value={{cover, setCover}}>
      <Modal ref={saveModal}><UpdateDocument book={book} sp={sp} thesis={thesis} course={selectedCourse} type={doc_type}/></Modal>
      <Modal ref={uploadFileModal}><UploadFile document={document} /></Modal>
      <Modal ref={uploadPosterModal}><UploadPoster document={document} /></Modal>
      <Modal ref={uploadCoverModal}><UploadBookCover document={document} /></Modal>
      <Modal ref={uploadManusModal}><UploadManuscript document={document}/></Modal>
      {
        (function(allowEdit, doc_type, userType){
          switch(allowEdit){
            // editable document
            case true:
              // if document is a book
              if(doc_type=="book"){
                return(
                  <div> 
                      <div className='document-card-flex-row'>
                          {/* document thumbnail not editable */}
                          <div className='image-card-container document-card-flex-column' >
                          <img src={document.book_cover_img} alt="" className={classes.imageStyle}></img>
                          
                          <UploadIcon className={classes.iconStyle} style={{alignSelf:'center'}}/>
                          <button className={classes.textStyle} onClick={() => openCoverModal()}>UPLOAD THUMBNAIL</button>
                          <span style={{overflow: "hidden"}}>Book Cover: {cover.length === 0  ? <p>None</p> :  <p>{cover[0].name}</p>}</span>
                          </div>
                          
                          {/* document attributes are editable*/}
                          <div className='document-card-container document-card-flex-column' key={document.id}>
                            <div className="main-text-tags">Classification: {document.type}</div>
                            <div className="main-text-tags">Title: <input  className="input-container" name= "book_title" type="text" defaultValue={document.title} onChange={handleInputChange}/> </div>
                            <div className="main-text-tags">Author: <input className="input-container" name="book_author" type="text" defaultValue={document.author} onChange={handleInputChange}/> </div>
                            <div className="main-text-tags">Year: <input className="input-container" name="book_year" type="number" defaultValue={document.year} onChange={handleInputChange}/></div>
                            <div className="main-text-tags">Publisher: <input className="input-container" name="book_publisher" type="text" defaultValue={document.publisher} onChange={handleInputChange}/> </div>
                            <div className="main-text-tags">ISBN: <input className="input-container" name="book_isbn" type="number" defaultValue={document.isbn} onChange={handleInputChange}/> </div>

                            <div className="main-text-tags">Tags:</div>
                            <Multiselect 
                                placeholder="Add a tag"
                                options={topics} 
                                closeIcon="cancel"
                                isObject={false}
                                onSelect={(selectedValue)=> selectTopic(selectedValue)} 
                                onRemove={(selectedValue)=> selectTopic(selectedValue)}   
                                style= { {searchBox: { border: "none", "borderBottom": "1px solid lightGray", "borderRadius": "0px", width: '100%' }} }
                                selectedValues={document.topic}
                            />

                            <div className="main-text-tags">Course:</div>
                            <Multiselect 
                                placeholder="Add a course"
                                options={course} 
                                closeIcon="cancel"
                                isObject={false}
                                onSelect={(selectedValue)=> selectCourse(selectedValue)} 
                                onRemove={(selectedValue)=> selectCourse(selectedValue)}   
                                style= { {searchBox: { border: "none", "borderBottom": "1px solid lightGray", "borderRadius": "0px", width: '100%' }} }
                                selectedValues={document.course_code}
                            />
                          </div>

                          
                          
                      </div>
  
                      <div className="description-section">
                          {/* descriptions/abstracts are editable*/}
                          <div className="document-card-container">
                            <h2 style={{textAlign:'center'}}>DESCRIPTION</h2>
                            <Box className={classes.boxStyle}>
                            <textarea className="textarea-container" name="book_description" defaultValue={document.description} onChange={handleInputChange} cols="40" rows="5"></textarea>
                            </Box>
                          </div>
                          <div className = "button-right">
                            <button className={classes.saveStyle} onClick={() => openSaveModal()}><SaveIcon className={classes.iconStyle}/></button>
                          </div>
                      </div>
                  </div>
                )
              } else if(doc_type=="thesis"){
                return(
                  <div> 
                      <div className='document-card-flex-row'>                          
                          {/* document attributes are editable*/}
                          <div className='document-card-container document-card-flex-column' key={document.id}>
                            <div className="main-text-tags">Classification: {document.type}</div>
                            <div className="main-text-tags">Title: <input className="input-container" name= "thesis_title" type="text" defaultValue={document.title} onChange={handleInputChange}/> </div>
                            <div className="main-text-tags">Author: <input className="input-container" name="thesis_author" type="text" defaultValue={document.author} onChange={handleInputChange}/> </div>
                            <div className="main-text-tags">Adviser: <input className="input-container"  name="thesis_adviser" type="text" defaultValue={document.adviser} onChange={handleInputChange}/></div>
                            <div className="main-text-tags">Publishing Date: <input className="input-container" name="thesis_pub_date" type="date" defaultValue={document.pub_date} onChange={handleInputChange}/> </div>
                            <div className="main-text-tags">Source Code: <input className="input-container" name="thesis_source_code" type="text" defaultValue={document.source_code} onChange={handleInputChange}/> </div>
                      
                            <div className="main-text-tags">Tags:</div>
                            <Multiselect 
                                placeholder="Add a tag"
                                options={topics} 
                                closeIcon="cancel"
                                isObject={false}
                                onSelect={(selectedValue)=> selectTopic(selectedValue)} 
                                onRemove={(selectedValue)=> selectTopic(selectedValue)}   
                                style= { {searchBox: { border: "none", "borderBottom": "1px solid lightGray", "borderRadius": "0px", width: '100%' }} }
                                selectedValues={document.topic}
                            />

                            <div className="main-text-tags">Course:</div>
                            <Multiselect 
                                placeholder="Add a course"
                                options={course} 
                                closeIcon="cancel"
                                isObject={false}
                                onSelect={(selectedValue)=> selectCourse(selectedValue)} 
                                onRemove={(selectedValue)=> selectCourse(selectedValue)}   
                                style= { {searchBox: { border: "none", "borderBottom": "1px solid lightGray", "borderRadius": "0px", width: '100%' }} }
                                selectedValues={document.courses}
                            />
                          </div>
                          <div className="document-card-container  uploads-container">
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
                          
                          {function(uploadToggle){
                            switch(uploadToggle){
                              case "file":
                                return (<div className="upload-navigation"> 
                                <h4>File</h4>
                                <Button onClick={() => openFileModal()}>Select New File</Button>
                                <p>Current File: {document.journal === undefined || document.journal === '' ? <p>None</p> : <p>{displayFileName(document.file)}</p>}</p>
                                <Button onClick={() => downloadJournal()}>Download File</Button>
                                <span style={{overflow: "hidden"}}>New File: {file.length === 0  ? <p>None</p> :  <p>{file[0].name}</p>}</span>
                                </div>)

                              case "poster":
                                return  (<div className="upload-navigation">
                                <h4>Poster</h4>
                                <Button onClick={() => openPosterModal()}>Select New Poster</Button>
                                <span style={{overflow: "hidden"}}>Current Uploaded Poster: {document.poster === undefined || document.poster === ''  ? <p>None</p> : <p>{displayFileName(document.poster)}</p>}</span>
                                <Button onClick={() => downloadPoster()}>Download Poster</Button>
                                <span style={{overflow: "hidden"}}>New Poster: {poster.length === 0  ? <p>None</p> :  <p>{poster[0].name}</p>}</span>
                                </div>)

                              case "manuscript":
                                return  (<div className="upload-navigation">
                                <h4>Manuscript</h4>
                                <Button onClick={() => openManusModal()}>Select New Manuscript</Button>
                                <span style={{overflow: "hidden"}}>Current Uploaded Manuscript: {document.file === undefined || document.file === ''  ? <p>None</p> : <p>{displayFileName(document.file)}</p>}</span>
                                <Button onClick={() => downloadFile()}>Download Manuscript</Button>
                                <span style={{overflow: "hidden"}}>New Manuscript: {manus.length === 0  ? <p>None</p> : <p>{displayFileName(manus[0].name)}</p>}</span>
                                </div>)
                            }
                          }(uploadToggle)              
                        }
                          </div>
                        
                      </div>
  
                      <div className="description-section">
                          {/* descriptions/abstracts are editable*/}
                          <div className="document-card-container">
                            <h2 style={{textAlign:'center'}}>ABSTRACT</h2>
                            <Box className={classes.boxStyle}>
                            <textarea className="textarea-container" name="thesis_abstract" defaultValue={document.abstract} onChange={handleInputChange} cols="40" rows="5"></textarea> 
                            </Box>
                          </div>
                            <div className = "button-right">
                            <button className={classes.saveStyle} onClick={() => openSaveModal()}><SaveIcon className={classes.iconStyle}/></button>
                          </div>
                      </div>
                  </div>
                )
              }  else if(doc_type=="sp"){
                return(
                  <div> 
                      <div className='document-card-flex-row'>                          
                          {/* document attributes are editable*/}
                          <div className='document-card-container document-card-flex-column' key={document.id}>
                            <div className="main-text-tags">Classification: {document.type}</div>
                            <div className="main-text-tags">Title: <input className="input-container" name= "sp_title" type="text" defaultValue={document.title} onChange={handleInputChange}/> </div>
                            <div className="main-text-tags">Author: <input className="input-container" name="sp_author" type="text" defaultValue={document.author} onChange={handleInputChange}/> </div>
                            <div className="main-text-tags">Adviser: <input className="input-container" name="sp_adviser" type="text" defaultValue={document.adviser} onChange={handleInputChange}/></div>
                            <div className="main-text-tags">Publishing Date: <input className="input-container" name="sp_pub_date" type="date" defaultValue={document.pub_date} onChange={handleInputChange}/> </div>
                            <div className="main-text-tags">Source Code: <input className="input-container" name="sp_source_code" type="text" defaultValue={document.source_code} onChange={handleInputChange}/> </div>
  
                            <div className="main-text-tags">Tags:</div>
                            <Multiselect 
                                placeholder="Add a tag"
                                options={topics} 
                                closeIcon="cancel"
                                isObject={false}
                                onSelect={(selectedValue)=> selectTopic(selectedValue)} 
                                onRemove={(selectedValue)=> selectTopic(selectedValue)}   
                                style= { {searchBox: { border: "none", "borderBottom": "1px solid lightGray", "borderRadius": "0px", width: '100%' }} }
                                selectedValues={document.topic}
                            />

                            <div className="main-text-tags">Course:</div>
                            <Multiselect 
                                placeholder="Add a course"
                                options={course} 
                                closeIcon="cancel"
                                isObject={false}
                                onSelect={(selectedValue)=> selectCourse(selectedValue)} 
                                onRemove={(selectedValue)=> selectCourse(selectedValue)}   
                                style= { {searchBox: { border: "none", "borderBottom": "1px solid lightGray", "borderRadius": "0px", width: '100%' }} }
                                selectedValues={document.courses}
                            />
                            </div>

                           <div className="document-card-container  uploads-container">
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
                          
                          {function(uploadToggle){
                            switch(uploadToggle){
                              case "file":
                                return (<div className="upload-navigation"> 
                                <h4>File</h4>
                                <Button onClick={() => openFileModal()}>Select New File</Button>
                                <p>Current File: {document.journal === undefined || document.journal === '' ? <p>None</p> : <p>{displayFileName(document.journal)}</p>}</p>
                                <Button onClick={() => downloadJournal()}>Download File</Button>
                                <span style={{overflow: "hidden"}}>New File: {file.length === 0  ? <p>None</p> :  <p>{file[0].name}</p>}</span>
                                </div>)

                              case "poster":
                                return  (<div className="upload-navigation">
                                <h4>Poster</h4>
                                <Button onClick={() => openPosterModal()}>Select New Poster</Button>
                                <span style={{overflow: "hidden"}}>Current Uploaded Poster: {document.poster === undefined || document.poster === ''  ? <p>None</p> : <p>{displayFileName(document.poster)}</p>}</span>
                                <Button onClick={() => downloadPoster()}>Download Poster</Button>
                                <span style={{overflow: "hidden"}}>New Poster: {poster.length === 0  ? <p>None</p> :  <p>{poster[0].name}</p>}</span>
                                </div>)

                              case "manuscript":
                                return  (<div className="upload-navigation">
                                <h4>Manuscript</h4>
                                <Button onClick={() => openManusModal()}>Select New Manuscript</Button>
                                <span style={{overflow: "hidden"}}>Current Uploaded Manuscript: {document.file === undefined || document.file === ''  ? <p>None</p> : <p>{displayFileName(document.file)}</p>}</span>
                                <Button onClick={() => downloadFile()}>Download Manuscript</Button>
                                <span style={{overflow: "hidden"}}>New Manuscript: {manus.length === 0  ? <p>None</p> : <p>{displayFileName(manus[0].name)}</p>}</span>
                                </div>)
                            }
                          }(uploadToggle)
                        }
                          </div>
                      </div>
  
                      <div className="description-section">
                          {/* descriptions/abstracts are editable*/}
                          <div className="document-card-container">
                            <h2 style={{textAlign:'center'}}>ABSTRACT</h2>
                            <Box className={classes.boxStyle}>
                            <textarea className="textarea-container" name="sp_abstract" defaultValue={document.abstract} onChange={handleInputChange} cols="40" rows="5"></textarea>
                            </Box>
                          </div>
                            <div className = "button-right">
                            <button className={classes.saveStyle} onClick={() => openSaveModal()}><SaveIcon className={classes.iconStyle}/></button>
                          </div>
                      </div>
                  </div>
                )
              }
              
            // unable to edit document
            case false:
              if(userType==undefined){ // if guest, do not show option for posters/journals
                if(doc_type=="book"){
                  return(
                    <div> 
                        <div className='document-card-flex-row'>
                            <div className='image-card-container' >
                              <img src={document.book_cover_img} alt="" className={classes.imageStyle}></img>
                            </div>
  
                            <div className='document-card-flex-column' key={document.id}>
                            <DocumentCard
                                type={document.type}
                                title={document.title}
                                author={document.author} 
                                yearPublished={document.year}
                                publisher={document.publisher}
                                docISBN={document.isbn}
                                topic={document.topic}
                                course={document.course_code}
                                view={document.view_count}
                            />
                            </div>
    
                        </div>
    
                        <div className="description-section">
                          <div className="document-card-container">
                            <h2 style={{textAlign: 'center'}}>DESCRIPTION</h2>
                            <Box className={classes.descriptionStyle}>
                            {document.description}
                            </Box>
                            </div>
                        </div>
                    </div>
                  )
                } else if(doc_type=="thesis" || doc_type=="sp"){
                  return(
                    <div> 
                        <div className='document-card-flex-row'>
                            <div className='document-card-flex-column' key={document.id}>
                              <DocumentCard
                                docID={document._id}
                                type={document.type}
                                title={document.title}
                                author={document.author}
                                adviser={document.adviser}
                                yearPublished={document.pub_date}
                                topic={document.topic}
                                course={document.courses}
                                view={document.view_count}
                              />  
                            </div>
                        </div>
    
                        <div className="description-section">
                            <div className="document-card-container">
                            <h2 style={{textAlign: 'center'}}>ABSTRACT</h2>
                            
                            <Box className={classes.descriptionStyle}>
                            {document.abstract}
                            </Box>
                            </div>
                        </div>
                    </div>
                  )
                } 
              } else { // if authenticated user, show option for posters/journals/manuscript
                if(doc_type=="book"){
                  return(
                    <div> 
                        <div className='document-card-flex-row'>
                            <div className='image-card-container' >
                              <img src={document.book_cover_img} alt="" className={classes.imageStyle}></img>
                            </div>

                            {console.log("[conditional edit] document course: ", document.course_code)}
                            <div className='document-card-flex-column' key={document.id}>
                            <DocumentCard
                                docID={document._id}
                                type={document.type}
                                title={document.title}
                                author={document.author} 
                                yearPublished={document.year}
                                publisher={document.publisher}
                                docISBN={document.isbn}
                                topic={document.topic}
                                course={document.course_code}
                                view={document.view_count}
                            />
                            </div>
    
                        </div>
    
                        <div className="description-section">
                          <div className="document-card-container">
                            <h2 style={{textAlign: 'center'}}>DESCRIPTION</h2>
                            <Box className={classes.descriptionStyle}>
                            {document.description}
                            </Box>
                            </div>
                        </div>
                    </div>
                  )
                } else if(doc_type=="thesis" || doc_type=="sp"){
                  return(
                    <div> 
                        <div className='document-card-flex-row'>
                            <div className='document-card-flex-column' key={document.id}>
                              {userType=="Student"?
                              <DocumentCard
                              docID={document._id}
                              type={document.type}
                              title={document.title}
                              author={document.author}
                              adviser={document.adviser}
                              yearPublished={document.pub_date}
                              topic={document.topic}
                              course={document.courses}
                              view={document.view_count}
                              />:
                              <DocumentCard
                              docID={document._id}
                              type={document.type}
                              title={document.title}
                              author={document.author}
                              adviser={document.adviser}
                              yearPublished={document.pub_date}
                              topic={document.topic}
                              course={document.courses}
                              code={document.source_code}
                              view={document.view_count}
                              /> }
                            
                            </div>
                        </div>
    
                        <div className="description-section">
                            <div className="document-card-container">
                            <h2 style={{textAlign: 'center'}}>ABSTRACT</h2>
                            
                            <Box className={classes.descriptionStyle}>
                            {document.abstract}
                            </Box>
                            </div>
                        </div>

                        <div className="description-section">
                          <div className="document-card-container">
                          <ToggleButtonGroup
                            value={view}
                            exclusive
                            onChange={handleView}
                            className={classes.toggleStyle}
                            aria-label="text alignment"
                          >
                            <ToggleButton value="poster" className={classes.fontStyle} aria-label="left aligned">
                              POSTER
                            </ToggleButton>
                            <ToggleButton value="journal" className={classes.fontStyle} aria-label="centered">
                              JOURNAL
                            </ToggleButton>
                            <ToggleButton value="manuscript" className={classes.fontStyle} aria-label="right aligned">
                              MANUSCRIPT
                            </ToggleButton>
                          </ToggleButtonGroup>

                          <div className="all-page-container">
                          {
                           
                          doc_type=="sp"? 
                          (function(view){
                            console.log("cond edit [journal]:", sp.file)
                            switch(view){
                              // editable document
                              case "journal":
                                return(<ViewPDF pdf={getPath(sp.journal)}/>)
                              case "poster":
                                return(<ViewPDF pdf={getPath(sp.poster)}/>)
                              case "manuscript":
                                return(<ViewPDF pdf={getPath(sp.file)}/>)
                                default:
                                  return null
                            } 
                          })(view)
                          : 
                          (function(view){
                            switch(view){
                              // editable document
                              case "journal":
                                return(<ViewPDF pdf={getPath(thesis.journal)}/>)
                              case "poster":
                                return(<ViewPDF pdf={getPath(thesis.poster)}/>)
                              case "manuscript":
                                return(<ViewPDF pdf={getPath(thesis.file)}/>)
                              default:
                                return null
                            } 
                          })(view)

                          }
                          </div>
                          
                          </div>
                        </div>
                    </div>
                  )
                } 
              }
             
            default:
              return null;	
          }
        })(allowEdit, doc_type, uData.classification)
    }
    </BookCoverContext.Provider>
    </PosterContext.Provider>
    </FileContext.Provider>
    </ManuscriptContext.Provider>
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
  fontStyle: {
    '&:hover': {
        color: "white",
     },
    color: 'black'
  },
  iconStyle: {
      '&:hover': {
          color: "#b3e5fc",
       },
      color:'black', 
      width:'5vh', 
      height:'5vh'
  },
  saveStyle:{ 
      backgroundColor: '#47ABD8', 
      border:'transparent',
      borderRadius:'10vh', 
      width:'10vh', 
      height:'10vh'
  },
  toggleStyle:{ 
    backgroundColor: '#95d2ec', 
    color:'white',
    // border:'transparent',
  },
  boxStyle:{
    flexWrap: "wrap",
    wordWrap: "break-word",
    wordBreak: "break-all",
    maxWidth: "80em"
  },
  descriptionStyle:{
    textAlign: 'center',
    paddingBottom:'5vh',
    wordWrap: "break-word"
  },
  imageStyle:{
      width: '45vh', 
      height: '70vh', 
      margin: '1em',
      objectFit: 'cover',
      alignSelf:'center'
  }
}));

export default ConditionalEdit;