import React, { useState, useEffect, useRef} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {Box} from "@material-ui/core";
import axios from 'axios';
import UploadIcon from '@material-ui/icons/Backup';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import {Multiselect} from 'multiselect-react-dropdown';
import Modal from './modal/Modal';
import SaveDocument from './modal/SaveDocument';
import './DocumentCard.css';

/**
 * functional component
 * conditionally render the input attributes according to document type
 * onHandleType and onSelect handles multi drop down options
 */

function CreateDocument(props){
  const classes = useStyles();
  const [doc_type, setDoctype] = useState([]);
  const [selectedValue, setSelectedValue] = useState([]);
  const [selectedTopic, setSelectedTag] = useState([]);

  // Create reference to modal
  const saveModal = useRef(null)
  const openSaveModal = (user, props) => {saveModal.current.open(user, props)}

  // section to initialize book/sp/thesis
  let book = {
    type: "",
    id: "",
    title: "",
    year: "",
    author: "",
    publisher: "",
    isbn: "",
    description: "",
    topic: "",
    course: ""
  };

  let thesis = {
    type: "",
    id: "",
    title: "",
    adviser: "",
    author: "",
    pub_date: "",
    abstract: "",
    topic: "",
    course: ""
  };

  let sp = {
    type: "",
    id: "",
    title: "",
    adviser: "",
    author: "",
    pub_date: "",
    abstract: "",
    topic: "",
    course: ""
  };

  // for handling data of new attributes
  const handleInputChange = async(event) =>{
    const target = event.target;

    if(doc_type=="book"){
      if(target.name==="book_id") book.id = target.value;
      else if(target.name==="book_title") book.title = target.value;
      else if(target.name==="book_author") book.author = target.value;
      else if(target.name==="book_year") book.year = target.value;
      else if(target.name==="book_publisher") book.publisher = target.value;
      else if(target.name==="book_isbn") book.isbn = target.value;
      else if(target.name==="book_description") book.description = target.value;
      else if(target.name==="book_topic") book.topic = target.value;
      else if(target.name==="book_course") book.course = target.value;

      console.log("data:\n",
      book.id,"\n", 
      book.title,"\n",
      book.author,"\n",
      book.year,"\n",
      book.publisher,"\n",
      book.isbn,"\n", 
      book.description,"\n",
      book.topic,"\n")
    } 

    else if(doc_type=="thesis"){
      if(target.name==="thesis_id") thesis.id = target.value;
      else if(target.name==="thesis_title") thesis.title = target.value;
      else if(target.name==="thesis_author") thesis.author = target.value;
      else if(target.name==="thesis_adviser") thesis.adviser = target.value;
      else if(target.name==="thesis_pub_date") thesis.pub_date = target.value;
      else if(target.name==="thesis_abstract") thesis.abstract = target.value;
      else if(target.name==="thesis_topic") thesis.topic = target.value;
      console.log("data:\n",
      thesis.id,"\n", 
      thesis.title,"\n",
      thesis.author,"\n",
      thesis.adviser,"\n",
      thesis.pub_date,"\n",
      thesis.abstract,"\n", 
      thesis.topic,"\n")
    }

    else if(doc_type=="sp"){
      if(target.name==="sp_id") sp.id = target.value;
      else if(target.name==="sp_title") sp.title = target.value;
      else if(target.name==="sp_author") sp.author = target.value;
      else if(target.name==="sp_adviser") sp.adviser = target.value;
      else if(target.name==="sp_pub_date") sp.pub_date = target.value;
      else if(target.name==="sp_abstract") sp.abstract = target.value;
      else if(target.name==="sp_topic") sp.topic = target.value;
      console.log("data:\n",
      sp.id,"\n", 
      sp.title,"\n",
      sp.author,"\n",
      sp.adviser,"\n",
      sp.pub_date,"\n",
      sp.abstract,"\n", 
      sp.topic,"\n")
    }
}

// for getting document type value
const handleType  = (selectedItem)  =>{
  setSelectedValue(selectedItem);
  console.log("content [type]: \n", selectedValue)
  
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

  // for tags input value
  const onSelect  = (selectedTag, type)  =>{
    setSelectedTag(selectedTag);
    console.log("content [topic]: \n", selectedTopic)

    if(type =="tags"){
      if(doc_type=="book") {
        book.topic = selectedTopic;
        console.log("after select topic data:\n",
        book.id,"\n", 
        book.title,"\n",
        book.author,"\n",
        book.year,"\n",
        book.publisher,"\n",
        book.isbn,"\n", 
        book.description,"\n",
        book.topic,"\n")
      }
      else if(doc_type=="sp") {
        sp.topic = selectedTopic;
        console.log("after select topic data:\n",
        sp.id,"\n", 
        sp.title,"\n",
        sp.author,"\n",
        sp.adviser,"\n",
        sp.pub_date,"\n",
        sp.abstract,"\n", 
        sp.topic,"\n")
      }
      else if(doc_type=="thesis") {
        thesis.topic = selectedTopic;
        console.log("after select topic data:\n",
        thesis.id,"\n", 
        thesis.title,"\n",
        thesis.author,"\n",
        thesis.adviser,"\n",
        thesis.pub_date,"\n",
        thesis.abstract,"\n", 
        thesis.topic,"\n")
      }
    } else if(type=="course"){
      //insert method for assigning the course object of document
      if(doc_type=="book") book.course = selectedTopic;
      else if(doc_type=="sp") sp.course = selectedTopic;
      else if(doc_type=="thesis") thesis.course = selectedTopic;
    }
    
  }

// THIS SECTION IS A SET OF ARRAYS OF CHOICES 
// useEffect for handling changes in tags input
useEffect(() => {
  handleType(selectedValue)
  onSelect(selectedTopic)
}, [selectedValue, selectedTopic])

const classification = [
  'Book',
  'Special Problem',
  'Thesis'
]

const course = ["CMSC 12", "CMSC 21", "CMSC 22", "CMSC 23", "CMSC 56", "CMSC 57", "CMSC 100", "CMSC 123", "CMSC 124",
 "CMSC 125", "CMSC 127", "CMSC 128", "CMSC 129", "CMSC 130", "CMSC 131", "CMSC 132", "CMSC 137", "CMSC 141", "CMSC 142", 
 "CMSC 150", "CMSC 161", "CMSC 165", "CMSC 170", "CMSC 172", "CMSC 173", "CMSC 180"];

const topics = [
  'Algorithms',
  'Android Development',
  'Artificial Intelligence',
  'Automata',
  'Bioinformatics',
  'Computer Architecture',
  'Computer Graphics',
  'Computer Security',
  'Cryptography',
  'Data Structures',
  'Database Management',
  'Discrete Mathematics',
  'Distributed Computing',
  'Human-Computer Interaction',
  'Image Processing',
  'Machine Learning',
  'Networking',
  'Operating System',
  'Parallel Algorithms',
  'Programming Languages',
  'Robotics',
  'Security',
  'Software Engineering',
  'Special Topic',
  'Speech Recognition',
  'User Interface',
  'Web Development',
]

  return(
    <div className="browsebg browsebg-container">
      {
        <div> 
            <div className='document-card-flex-row'>
                {/* document thumbnail should be uploadable */}
                {/* <div className='image-card-container card-content' >
                <img alt="INSERT A THUMBNAIL" className={classes.imageStyle}></img>
                </div> */}

                <div className='document-card-container button-card-flex-column'>
                  <UploadIcon className={classes.iconStyle} style={{alignSelf:'center'}}/>
                  <button className={classes.textStyle} onClick={props.handleDownload}>UPLOAD THUMBNAIL</button>
                </div>
                
                {/* document attributes are editable*/}
                <div className='document-card-container document-card-flex-column' key={""}>
                  <div className="main-text-tags">Classification: 
                  <Multiselect 
                      selectionLimit="1"
                      placeholder="Document Type"
                      options={classification} 
                      closeIcon="cancel"
                      isObject={false} 
                      onSelect={(selectedValue)=> handleType(selectedValue)} 
                      onRemove={(selectedValue)=> handleType(selectedValue)}   
                      style= { {searchBox: { border: "none", "border-bottom": "1px solid lightGray", "border-radius": "0px", width: '100%' }} }
                  />
                  </div>

                  {
                    (function(doc_type){
                        switch(doc_type){
                            case "book": //input section for book attributes
                                return(
                                    <div>
                                      <Modal ref={saveModal}><SaveDocument book={book} type={doc_type}/></Modal>
                                      <div className="main-text-tags">ID: <input  className="input-container" name= "book_id" type="text" onChange={handleInputChange}/> </div>
                                      <div className="main-text-tags">Title: <input  className="input-container" name= "book_title" type="text" onChange={handleInputChange}/> </div>
                                      <div className="main-text-tags">Author: <input className="input-container" name="book_author" type="text" onChange={handleInputChange}/> </div>
                                      <div className="main-text-tags">Year: <input className="input-container" name="book_year" type="text" onChange={handleInputChange}/></div>
                                      <div className="main-text-tags">Publisher: <input className="input-container" name="book_publisher" type="text" onChange={handleInputChange}/> </div>
                                      <div className="main-text-tags">ISBN: <input className="input-container" name="book_isbn" type="text" onChange={handleInputChange}/> </div>
                                    </div>
                                )
                              case "sp": //input section for sp attributes
                                return(
                                  <div>
                                    <Modal ref={saveModal}><SaveDocument sp={sp} type={doc_type}/></Modal>
                                    <div className="main-text-tags">ID: <input  className="input-container" name= "sp_id" type="text" onChange={handleInputChange}/> </div>
                                    <div className="main-text-tags">Title: <input  className="input-container" name= "sp_title" type="text" onChange={handleInputChange}/> </div>
                                    <div className="main-text-tags">Author: <input className="input-container" name="sp_author" type="text" onChange={handleInputChange}/> </div>
                                    <div className="main-text-tags">Adviser: <input className="input-container" name="sp_adviser" type="text" onChange={handleInputChange}/></div>
                                    <div className="main-text-tags">Publishing Date: <input className="input-container" name="sp_pub_date" type="text" onChange={handleInputChange}/> </div>
                                  </div>
                                )
                              case "thesis": //input section for thesis attributes
                                return(
                                  <div>
                                    <Modal ref={saveModal}><SaveDocument thesis={thesis} type={doc_type}/></Modal>
                                    <div className="main-text-tags">ID: <input  className="input-container" name= "thesis_id" type="text" onChange={handleInputChange}/> </div>
                                    <div className="main-text-tags">Title: <input  className="input-container" name= "thesis_title" type="text" onChange={handleInputChange}/> </div>
                                    <div className="main-text-tags">Author: <input className="input-container" name="thesis_author" type="text" onChange={handleInputChange}/> </div>
                                    <div className="main-text-tags">Adviser: <input className="input-container" name="thesis_adviser" type="text" onChange={handleInputChange}/></div>
                                    <div className="main-text-tags">Publishing Date: <input className="input-container" name="thesis_pub_date" type="text" onChange={handleInputChange}/> </div>
                                </div>
                                )
                            default: 
                              return null;
                        }
                    })(doc_type)
                  }
               
                  {/* This section is for course of the document, this part has a lot of bugs */}
                  <div className="main-text-tags">Courses:</div>
                  <Multiselect 
                      placeholder="Add a course"
                      options={course} 
                      closeIcon="cancel"
                      isObject={false}
                      onSelect={(selectedValue)=> onSelect(selectedValue, "course")} 
                      onRemove={(selectedValue)=> onSelect(selectedValue, "course")}   
                      style= { {searchBox: { border: "none", "border-bottom": "1px solid lightGray", "border-radius": "0px", width: '100%' }} }
                  />
                  {/* This section is for topic of the document */}
                  <div className="main-text-tags">Tags:</div>
                  <Multiselect 
                      placeholder="Add a tag"
                      options={topics} 
                      closeIcon="cancel"
                      isObject={false}
                      onSelect={(selectedTopic)=> onSelect(selectedTopic, "tags")} 
                      onRemove={(selectedTopic)=> onSelect(selectedTopic, "tags")}   
                      style= { {searchBox: { border: "none", "border-bottom": "1px solid lightGray", "border-radius": "0px", width: '100%' }} }
                  />
                </div>

                <div className='document-card-container button-card-flex-column'>
                  <button className={classes.textStyle} onClick={props.handleDownload}><UploadIcon className={classes.iconStyle}/> UPLOAD PDF</button>
                  <button className={classes.textStyle} onClick={props.handleEdit}><EditIcon className={classes.iconStyle}/>UPDATE PDF</button>
                </div>
            </div>
                
            {/* descriptions/abstracts are editable*/}
            <div className="description-section">
                { 
                    (function(doc_type){
                        switch(doc_type){
                            case "thesis": //input section for book attributes
                              return(
                                <div className="document-card-container">
                                  <h2 style={{textAlign:'center'}}>ABSTRACT</h2>
                                  <Box className={classes.boxStyle}>
                                  <textarea className="textarea-container" name="thesis_abstract" onChange={handleInputChange} cols="40" rows="5"></textarea>
                                  </Box>
                                </div>
                              )
                            case "sp": //input section for book attributes
                              return(
                                <div className="document-card-container">
                                  <h2 style={{textAlign:'center'}}>ABSTRACT</h2>
                                  <Box className={classes.boxStyle}>
                                  <textarea className="textarea-container" name="sp_abstract" onChange={handleInputChange} cols="40" rows="5"></textarea>
                                  </Box>
                                </div>
                              )
                            default: 
                              return(
                                <div className="document-card-container">
                                  <h2 style={{textAlign:'center'}}>DESCRIPTION</h2>
                                  <Box className={classes.boxStyle}>
                                  <textarea className="textarea-container" name="book_description" onChange={handleInputChange} cols="40" rows="5"></textarea>
                                  </Box>
                                </div>
                              )
                        }
                    })(doc_type)
                  }
                <div className = "button-right">
                  <button className={classes.saveStyle} onClick={() => openSaveModal()}><SaveIcon className={classes.iconStyle}/></button>
                </div>
            </div>
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