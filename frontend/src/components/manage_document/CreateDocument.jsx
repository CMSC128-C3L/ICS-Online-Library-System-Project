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
import { useForm, Controller } from 'react-hook-form';

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

  //for testing validation 
  const { register, handleSubmit, getValues, control, formState: { errors } } = useForm();

  // Create reference to modal
  const saveModal = useRef(null)
  const openSaveModal = (user, props) => {saveModal.current.open(user, props)}

  // section to initialize book/sp/thesis
  let book = {
    type: "",
    id: getValues("ID"),
    title: getValues("Title"),
    year: getValues("Year"),
    author:getValues("Author"),
    publisher: getValues("Publisher"),
    isbn: getValues("ISBN"),
    description: getValues("Description"),
    topic:"",
    course: ""
  };

  let thesis = {
    type: "",
    id: getValues("THESIS_ID"),
    title: getValues("THESIS_Title"),
    adviser: getValues("THESIS_Adviser"),
    author: getValues("THESIS_Author"),
    pub_date: getValues("THESIS_Date"),
    abstract: getValues("THESIS_Abstract"),
    topic: "",
    course: ""
  };

  let sp = {
    type: "",
    id: getValues("SP_ID"),
    title: getValues("SP_Title"),
    adviser: getValues("SP_Adviser"),
    author: getValues("SP_Author"),
    pub_date: getValues("SP_Date"),
    abstract: getValues("SP_Abstract"),
    topic: [],
    course: []
  };
  let topic_tags = [];
  let course_tags = [];

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
  // if(doc_type=="book") book.topic = selectedTopic;
  // else if(doc_type=="sp") sp.topic = selectedTopic;
  // else if(doc_type=="thesis") thesis.topic = selectedTopic;

  if(type ==="tags"){
    console.log("TAGS");
    if(doc_type=="book") book.topic = selectedTopic;
    else if(doc_type=="sp") sp.topic = selectedTopic;
    else if(doc_type=="thesis") thesis.topic = selectedTopic;
  } else if(type==="course"){
    //insert method for assigning the course object of document
    book.courses = selectedTopic;
  }
  
}

// useEffect for handling changes in tags input
useEffect(() => {
  handleType(selectedValue)
  onSelect(selectedTopic)
}, [selectedValue, selectedTopic])

// THIS SECTION IS A SET OF ARRAYS OF CHOICES 

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
            <Modal ref={saveModal}><SaveDocument book={book} sp={sp} thesis={thesis} type={doc_type}/></Modal>
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
                                      <div className="main-text-tags">ID: <input type="number" className="input-container" name= "book_id" placeholder="ID"  {...register("ID", {required: true, min: 1})} />  </div>
                                      {errors.ID && <div className="warning">This field is required</div>}
                                      <div className="main-text-tags">Title: <input type="text" className="input-container" name= "book_title" placeholder="Title"  {...register("Title", {required: true, min: 1})} /> </div>
                                      {errors.Title && <div className="warning">This field is required</div>}
                                      <div className="main-text-tags">Author: <input type="text" className="input-container" name= "book_author" placeholder="Author"  {...register("Author", {required: true, min: 1})} /> </div>
                                      {errors.Author && <div className="warning">This field is required</div>}
                                      <div className="main-text-tags">Year: <input type="number" className="input-container" name= "book_year" placeholder="Year"  {...register("Year", {required: true, min: 1000})} /> </div>
                                      {errors.Year && <div className="warning">This field is required</div>}
                                      <div className="main-text-tags">Publisher: <input type="text" className="input-container" name= "book_publisher" placeholder="Publisher"  {...register("Publisher", {required: true, min: 1})} /> </div>
                                      {errors.Publisher && <div className="warning">This field is required</div>}
                                      <div className="main-text-tags">ISBN: <input type="text" className="input-container" name= "book_isbn" placeholder="ISBN"  {...register("ISBN", {required: true, min: 1})} /> </div>
                                      {errors.ISBN && <div className="warning">This field is required</div>}

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
                                )
                              case "sp": //input section for sp attributes
                                return(
                                  <div>
                                    
                                    <div className="main-text-tags">ID: <input  className="input-container" name= "sp_id" type="text"  {...register("SP_ID", {required: true, min: 1})}/> </div>
                                    {errors.SP_ID && <div className="warning">This field is required</div>}
                                    <div className="main-text-tags">Title: <input  className="input-container" name= "sp_title" type="text"  {...register("SP_Title", {required: true, min: 1})}/>  </div>
                                    {errors.SP_Title && <div className="warning">This field is required</div>}
                                    <div className="main-text-tags">Author: <input className="input-container" name="sp_author" type="text"  {...register("SP_Author", {required: true, min: 1})}/> </div>
                                    {errors.SP_Author && <div className="warning">This field is required</div>}
                                    <div className="main-text-tags">Adviser: <input className="input-container" name="sp_adviser" type="text"  {...register("SP_Adviser", {required: true, min: 1})}/>  </div>
                                    {errors.SP_Adviser && <div className="warning">This field is required</div>}
                                    <div className="main-text-tags">Publishing Date: <input className="input-container" name="sp_pub_date" type="text"  {...register("SP_Date", {required: true, min: 1})} /> </div>
                                    {errors.SP_Date && <div className="warning">This field is required</div>}

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
                                )
                              case "thesis": //input section for thesis attributes
                                return(
                                  <div>
                                    
                                    <div className="main-text-tags">ID: <input  className="input-container" name= "thesis_id" type="text"  {...register("THESIS_ID", {required: true, min: 1})}/> </div>
                                    {errors.THESIS_ID && <div className="warning">This field is required</div>}
                                    <div className="main-text-tags">Title: <input  className="input-container" name= "thesis_title" type="text"  {...register("THESIS_Title", {required: true, min: 1})}/> </div>
                                    {errors.THESIS_Title && <div className="warning">This field is required</div>}
                                    <div className="main-text-tags">Author: <input className="input-container" name="thesis_author" type="text"  {...register("THESIS_Author", {required: true, min: 1})}/> </div>
                                    {errors.THESIS_Author && <div className="warning">This field is required</div>}
                                    <div className="main-text-tags">Adviser: <input className="input-container" name="thesis_adviser" type="text"  {...register("THESIS_Adviser", {required: true, min: 1})}/></div>
                                    {errors.THESIS_Adviser && <div className="warning">This field is required</div>}
                                    <div className="main-text-tags">Publishing Date: <input className="input-container" name="thesis_pub_date" type="text"  {...register("THESIS_Date", {required: true, min: 1})}/> </div>
                                    {errors.THESIS_Date && <div className="warning">This field is required</div>}

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
                                )
                            default: 
                              return null;
                        }
                    })(doc_type)
                  }
               
                  
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
                            case "thesis": //input section for thesis attributes
                              return(
                                <div className="document-card-container">
                                  <h2 style={{textAlign:'center'}}>ABSTRACT</h2>
                                  <Box className={classes.boxStyle}>
                                  <textarea className="textarea-container" name="thesis_abstract"  cols="40" rows="5" {...register("Abstract", {required: true})}></textarea>
                                  </Box>
                                  {errors.Abstract && <div className="warning">This field is required</div>}
                                </div>
                              )
                            case "sp": //input section for sp attributes
                              return(
                                <div className="document-card-container">
                                  <h2 style={{textAlign:'center'}}>ABSTRACT</h2>
                                  <Box className={classes.boxStyle}>
                                  <textarea className="textarea-container" name="sp_abstract"  cols="40" rows="5" {...register("Abstract", {required: true})}></textarea>
                                  </Box>
                                  {errors.Abstract && <div className="warning">This field is required</div>}
                                </div>
                              )
                              case "book":
                                return(
                                  <div className="document-card-container">
                                    <h2 style={{textAlign:'center'}}>DESCRIPTION</h2>
                                    <Box className={classes.boxStyle}>
                                    <textarea className="textarea-container" name="book_description"  cols="40" rows="5" {...register("Description", {required: true})} ></textarea>
                                    </Box>
                                    {errors.Description && <div className="warning">This field is required</div>}
                                  </div>
                                )
                            default: //input section for book attributes
                              return null
                        }
                    })(doc_type)
                  }
                <div className = "button-right">
                  <button className={classes.saveStyle} onClick={handleSubmit(openSaveModal)}><SaveIcon className={classes.iconStyle}/></button>
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