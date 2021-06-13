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
import DocumentCard from './DocumentCard';
import Modal from './modal/Modal';
import UpdateDocument from './modal/UpdateDocument';
import {Multiselect} from 'multiselect-react-dropdown';
import './DocumentCard.css';
import { UserContext } from '../user/UserContext'
import {classification, course, topics} from './Choices.jsx'
import { FileContext } from './FileContext';
import UploadFile from './modal/UploadFile';
import Button from '@material-ui/core/Button'
/**
 * functional component
 * conditionally allow edit on documents depending on the button clicked from admin view
 * onChange triggers update from functions stated in manage document 
 */

function ConditionalEdit(props){
  const classes = useStyles();
  const [document, setDocument] = useState([]);
  const {id} = useParams();
  const [selectedTopic, setSelectedTopic] = useState([document.topic]);
  const {loggedUser, setLoggedUser} = useContext(UserContext); 
  // const {file, setFile} = useContext(FileContext)
  const [file, setFile] = useState([])
  // Create reference to modal
  const saveModal = useRef(null)
  const openSaveModal = (user, props) => {saveModal.current.open(user, props)}
  const uploadFileModal = useRef(null);
  const openFileModal = () => {uploadFileModal.current.open(props)}
  
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

  //get the specific document data 
  const getDocument = async() =>{
      let document;
      let options =  {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}, }
      
      try{
          if(doc_type == "book") document = await axios.get(`/api/books/${id}`);
          else if(doc_type == "sp") document = await axios.get(`/api/sp/${id}`);
          else if(doc_type == "thesis") document = await axios.get(`/api/thesis/${id}`);

          setDocument(document.data); 
         
          console.log('test: ', file);

          const log = await axios.patch('/api/log/doc/'+loggedUser.user_id,{doc_id:id});

      }catch(e){
          console.log(e)
      }
  }

  const downloadFile = async() =>{
    let options =  {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}, }

    try{
      if(doc_type == "thesis") axios.get(`api/thesis/download/${id}`)
    }catch(e){
      console.log(e)
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
    topic: ""
  })

  const [sp, setSP] = useState({
    title: "",
    adviser: "",
    author: "",
    pub_date: "",
    abstract: "",
    courses: "",
    topic: ""
  })

  useEffect(() => {
    if(doc_type=="book") setBook({ ...book, 
      title: document.title,
      year: document.year,
      author: document.author,
      publisher: document.publisher,
      isbn: document.isbn,
      description: document.description,
      courses: document.course_code,
      topic: document.topic
    })
    else if(doc_type=="sp") setSP({ ...sp, 
      title: document.title,
      adviser: document.adviser,
      author: document.author,
      pub_date: document.pub_date,
      abstract: document.abstract,
      courses: document.course_code,
      topic: document.topic
    })
    else if(doc_type=="thesis") setThesis({ ...thesis, 
      title: document.title,
      adviser: document.adviser,
      author: document.author,
      pub_date: document.pub_date,
      abstract: document.abstract,
      courses: document.course_code,
      topic: document.topic
    })
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
      else if(target.name==="thesis_abstract") thesis.abstract = target.value;
    }

    else if(doc_type=="sp"){
      if(target.name==="sp_title") sp.title = target.value;
      else if(target.name==="sp_author") sp.author = target.value;
      else if(target.name==="sp_adviser") sp.adviser = target.value;
      else if(target.name==="sp_pub_date") sp.pub_date = target.value;
      else if(target.name==="sp_abstract") sp.abstract = target.value;
    }
}

  // for tags input value
  const selectTopic  = (selectedItem)  =>{
    setSelectedTopic(selectedItem);
    console.log("content [select]: \n", selectedTopic)
    
    if(doc_type=="book") book.topic = selectedTopic
    else if(doc_type=="sp") sp.topic = selectedTopic
    else if(doc_type=="thesis") thesis.topic = selectedTopic
  }

  useEffect(() => {
    selectTopic(selectedTopic)
}, [selectedTopic])

  return(
    <div className="browsebg browsebg-container">
      <FileContext.Provider value={{file, setFile}}>
      <Modal ref={saveModal}><UpdateDocument book={book} sp={sp} thesis={thesis} type={doc_type}/></Modal>
      <Modal ref={uploadFileModal}><UploadFile document={document} /></Modal>
      {
        (function(allowEdit, doc_type){
          switch(allowEdit){
            // editable document
            case true:
              // if document is a book
              if(doc_type=="book"){
                return(
                  <div> 
                      <div className='document-card-flex-row'>
                          {/* document thumbnail not editable */}
                          <div className='image-card-container card-content' >
                          <img src={document.book_cover_img} alt="" className={classes.imageStyle}></img>
                          </div>
                          
                          {/* document attributes are editable*/}
                          <div className='document-card-container document-card-flex-column' key={document.id}>
                            <div className="main-text-tags">Classification: {document.type}</div>
                            <div className="main-text-tags">Title: <input  className="input-container" name= "book_title" type="text" defaultValue={document.title} onChange={handleInputChange}/> </div>
                            <div className="main-text-tags">Author: <input className="input-container" name="book_author" type="text" defaultValue={document.author} onChange={handleInputChange}/> </div>
                            <div className="main-text-tags">Year: <input className="input-container" name="book_year" type="number" defaultValue={document.year} onChange={handleInputChange}/></div>
                            <div className="main-text-tags">Publisher: <input className="input-container" name="book_publisher" type="text" defaultValue={document.publisher} onChange={handleInputChange}/> </div>
                            <div className="main-text-tags">ISBN: <input className="input-container" name="book_isbn" type="number" defaultValue={document.isbn} onChange={handleInputChange}/> </div>
                            {/* <TagsInput topic={book.topic}/> */}
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
                          </div>
  
                          <div className='document-card-container button-card-flex-column'>
                            <button className={classes.textStyle} onClick={() => openFileModal()}><DownloadIcon className={classes.iconStyle}/> DOWNLOAD PDF</button>
                            <button className={classes.textStyle} onClick={props.handleEdit}><EditIcon className={classes.iconStyle}/>UPDATE PDF</button>
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
                          </div>
                          <div className='document-card-container button-card-flex-column'>
                            <h4>File</h4>
                            <Button onClick={() => openFileModal()}>Select New File</Button>
                            <p>Current File: {file.length === 0 ? <p>None</p> : <p>{file[0].name}</p>}</p>
                            <Button onClick={() => downloadFile()}>Download File</Button>
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
                          </div>
                          <div className='document-card-container button-card-flex-column'>
                            <button className={classes.textStyle} onClick={props.handleDownload}><DownloadIcon className={classes.iconStyle}/> DOWNLOAD PDF</button>
                            <button className={classes.textStyle} onClick={() => openFileModal()}><EditIcon className={classes.iconStyle}/>UPDATE PDF</button>
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
                              type={document.type}
                              title={document.title}
                              author={document.author}
                              adviser={document.adviser}
                              yearPublished={document.pub_date}
                              topic={document.topic}
                              course={document.course_code}
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
             
            default:
              return null;	
          }
        })(allowEdit, doc_type)
    }

    </FileContext.Provider>
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
    textAlign: 'center',
    paddingBottom:'5vh',
    wordWrap: "break-word"
  },
  imageStyle:{
      width: '45vh', 
      height: '70vh', 
      margin: '1em',
      objectFit: 'cover'
  }
}));

export default ConditionalEdit;