import React, { useState, useEffect, useRef} from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from 'react-router';
import {Box} from "@material-ui/core";
import axios from 'axios';
import UploadIcon from '@material-ui/icons/Backup';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import DocumentCard from './DocumentCard';
import {Multiselect} from 'multiselect-react-dropdown';
import Modal from './modal/Modal';
import SaveDocument from './modal/SaveDocument';
import './DocumentCard.css';

/**
 * functional component
 * conditionally allow edit on documents depending on the button clicked from admin view
 * onChange triggers update from functions stated in manage document 
 */

function CreateDocument(props){
  const classes = useStyles();
  const [document, setDocument] = useState([]);
  const {id} = useParams();
  const [selectedValue, setSelectedValue] = useState([]);

  // Create reference to modal
  const saveModal = useRef(null)
  const openSaveModal = (user, props) => {saveModal.current.open(user, props)}

  //get flag whether the edit button from manage document is clicked
  let location = useLocation();
  let doc_type;

  if(location.state != undefined) {
    doc_type = location.state.type;
  } else {
    doc_type = "";
  }

  //get the specific document data 
  const getDocument = async() =>{
      let document;
      
      try{
          if(doc_type == "book") document = await axios.get(`/api/books/${id}`);
          else if(doc_type == "sp") document = await axios.get(`/api/sp/${id}`);
          else if(doc_type == "thesis") document = await axios.get(`/api/thesis/${id}`);

          if(doc_type == "thesis") setDocument(document.data[0]);
          else setDocument(document.data); // doc_type == "book" || doc_type == "sp"
      }catch(e){
          console.log(e)
      }
  }

  useEffect(() => {
      getDocument()
  }, [])

  // section to initialize book/sp/thesis
  let book = {
    title: document.title,
    year: document.year,
    author: document.author,
    publisher: document.publisher,
    isbn: document.isbn,
    description: document.description,
    topic: document.topic
  };

  let thesis = {
    title: document.title,
    adviser: document.adviser,
    author: document.author,
    pub_date: document.pub_date,
    abstract: document.abstract,
    topic: document.topic
  };

  let sp = {
    title: document.title,
    adviser: document.adviser,
    author: document.author,
    pub_date: document.pub_date,
    abstract: document.abstract,
    topic: document.topic
  };

  const handleInputChange = async(event) =>{
    const target = event.target;

    if(doc_type=="book"){
      if(target.name==="book_title") book.title = target.value;
      else if(target.name==="book_author") book.author = target.value;
      else if(target.name==="book_year") book.year = target.value;
      else if(target.name==="book_publisher") book.publisher = target.value;
      else if(target.name==="book_isbn") book.isbn = target.value;
      else if(target.name==="book_description") book.description = target.value;
      else if(target.name==="book_topic") book.topic = target.value;
    } 

    else if(doc_type=="thesis"){
      if(target.name==="thesis_title") thesis.title = target.value;
      else if(target.name==="thesis_author") thesis.author = target.value;
      else if(target.name==="thesis_adviser") thesis.adviser = target.value;
      else if(target.name==="thesis_pub_date") thesis.pub_date = target.value;
      else if(target.name==="thesis_abstract") thesis.abstract = target.value;
      else if(target.name==="thesis_topic") thesis.topic = target.value;
    }

    else if(doc_type=="sp"){
      if(target.name==="sp_title") sp.title = target.value;
      else if(target.name==="sp_author") sp.author = target.value;
      else if(target.name==="sp_adviser") sp.adviser = target.value;
      else if(target.name==="sp_pub_date") sp.pub_date = target.value;
      else if(target.name==="sp_abstract") sp.abstract = target.value;
      else if(target.name==="sp_topic") sp.topic = target.value;
    }
}

  // for tags input value
  const onSelect  = (selectedItem, type)  =>{
    setSelectedValue(selectedItem);
    console.log("content [select]: \n", selectedValue)

    if(type =="tags"){
      if(doc_type=="book") book.topic = selectedValue;
      else if(doc_type=="sp")  sp.topic = selectedValue;
      else if(doc_type=="thesis")  thesis.topic = selectedValue;
    } else if(type=="type"){
      //insert method for assigning the classification of document
    }
    
  }

  const onRemove = (selectedItem, type)  =>{
      setSelectedValue(selectedItem);
      console.log("content [remove]: \n", selectedValue)

      if(type =="tags"){
        if(doc_type=="book") book.topic = selectedValue;
        else if(doc_type=="sp")  sp.topic = selectedValue;
        else if(doc_type=="thesis")  thesis.topic = selectedValue;
      } else if(type=="type"){
        //insert method for assigning the classification of document
      }
  }

const classification = [
  'Book',
  'Special Problem',
  'Thesis'
]

const data = [
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
            <Modal ref={saveModal}><SaveDocument book={book} type={doc_type}/></Modal>

            <div className='document-card-flex-row'>
                {/* document thumbnail not editable */}
                <div className='image-card-container card-content' >
                <img src={document.book_cover_img} alt="" className={classes.imageStyle}></img>
                </div>
                
                {/* document attributes are editable*/}
                <div className='document-card-container document-card-flex-column' key={document.id}>
                  <div className="main-text-tags">Classification: 
                  <Multiselect 
                      selectionLimit="1"
                      placeholder="Document Type"
                      options={classification} 
                      closeIcon="cancel"
                      isObject={false}
                      onSelect={(selectedValue)=> onSelect(selectedValue, "type")} 
                      onRemove={(selectedValue)=> onRemove(selectedValue, "type")}   
                      style= { {searchBox: { border: "none", "border-bottom": "1px solid lightGray", "border-radius": "0px", width: '100%' }} }
                      selectedValues={document.topic}
                  />
                  
                  </div>
                  <div className="main-text-tags">Title: <input  className="input-container" name= "book_title" type="text" defaultValue={document.title} onChange={handleInputChange}/> </div>
                  <div className="main-text-tags">Author: <input className="input-container" name="book_author" type="text" defaultValue={document.author} onChange={handleInputChange}/> </div>
                  <div className="main-text-tags">Year: <input className="input-container" name="book_year" type="text" defaultValue={document.year} onChange={handleInputChange}/></div>
                  <div className="main-text-tags">Publisher: <input className="input-container" name="book_publisher" type="text" defaultValue={document.publisher} onChange={handleInputChange}/> </div>
                  <div className="main-text-tags">ISBN: <input className="input-container" name="book_isbn" type="text" defaultValue={document.isbn} onChange={handleInputChange}/> </div>
                  {/* <TagsInput topic={book.topic}/> */}
                  <div className="main-text-tags">Tags:</div>
                  <Multiselect 
                      placeholder="Add a tag"
                      options={data} 
                      closeIcon="cancel"
                      isObject={false}
                      onSelect={(selectedValue)=> onSelect(selectedValue, "tags")} 
                      onRemove={(selectedValue)=> onRemove(selectedValue, "tags")}   
                      style= { {searchBox: { border: "none", "border-bottom": "1px solid lightGray", "border-radius": "0px", width: '100%' }} }
                      selectedValues={document.topic}
                  />
                </div>

                <div className='document-card-container button-card-flex-column'>
                  <button className={classes.textStyle} onClick={props.handleDownload}><UploadIcon className={classes.iconStyle}/> UPLOAD PDF</button>
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