import React, {useContext, useParams} from 'react';
import { UserContext } from '../user/UserContext'
import './DocumentCard.css'
import decode from 'jwt-decode';
import Button from '@material-ui/core/Button'
import MenuBookIcon from '@material-ui/icons/MenuBook';
import FindInPageIcon from '@material-ui/icons/FindInPage';
const handleAuthorClick = (event) => {
    console.log(event.target.value)
    /** method to navigate to author summary here */
}

const handleCourseClick = (event) => {
    console.log(event.target.value)
    /** method to navigate to course summary here */
}

const handleAdviserClick = (event) => {
    console.log(event.target.value)
    /** method to navigate to author summary here
     *  may be removed and absorbed in author click if method is the same
     */
}

const isPrivileged = (user) =>{
    if(user === "Faculty" || user === "Staff" || user === "Admin") return true
    else return false
}



// functional component to render the details in document card format 
// used in accessing document
function DocumentCard(props){
    //method for assigning props to object (for mapping values) 
    const uData = (localStorage.length != 0) ? decode(localStorage.getItem('token')) : '{}';
    let authorObj = {},topicObj = {},courseObj = {},adviserObj = {};
    Object.assign(adviserObj, props.adviser)
    Object.assign(topicObj, props.topic)
    Object.assign(courseObj, props.course)
    Object.assign(authorObj, props.author)
  
    const downloadFile = async() =>{
    let options =  {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}, }

    try{
      if(props.type === "Thesis") {
          console.log("thesis donwlaod")
        let popUp = window.open("http://localhost:5000/api/thesis/download/"+localStorage.getItem('token')+"/"+props.docID, '_parent');
      }else if(props.type === "Special Problem"){
          console.log("sp downlaod")
        let popUp = window.open("http://localhost:5000/api/sp/download/"+localStorage.getItem('token')+"/"+props.docID, '_parent');
      }
    }catch(e){
      
    }
  }

  const downloadPoster = async() =>{
    let options =  {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}, }
    
    try{
      if(props.type === "Thesis") {
        let popUp = window.open("http://localhost:5000/api/thesis/download/"+localStorage.getItem('token')+"/"+props.docID, '_parent');
      }else if(props.type === "Special Problem"){
        let popUp = window.open("http://localhost:5000/api/sp/download/"+localStorage.getItem('token')+"/"+props.docID, '_parent');
      }
    }catch(e){
      console.log(e)
    }
  }
    
    return (
        <div>
            {
            (function(document, userType){

                switch(document.type){
                    case "Book": //book
                        return(
                            <div className="document-card-container ">
                                <div className="document-card-flex-column">
                                    <div className="main-text-tags">{document.type}</div>
                                    <div className="main-text-tags">{document.title}</div>

                                    {/* clickable author */}
                                    <div className="text-tags"> Author: 
                                        <ul className="click-list">
                                        {Object.values(document.author).map((author) => {
                                            return (<button className="click-text" key ={document.id} onClick={handleAuthorClick}>{author}</button>)
                                        })}
                                        </ul>
                                    </div>

                                    <div className="text-tags">Year Published: {document.yearPublished}</div>
                                    <div className="text-tags">Publisher: {document.publisher}</div>
                                    <div className="text-tags">ISBN: {document.docISBN}</div>

                                    {/* clickable course */}
                                    {Object.keys(document.course).length==0? console.log("[book course] undefined"): 
                                    (<div className="text-tags">Course: 
                                        <ul className="click-list">
                                        {document.course.map((course) => {
                                            return (<button className="click-text" key ={document.id} onClick={handleCourseClick}>{course}</button>)
                                        })}
                                        </ul>
                                    </div>)
                                    }

                                    {/* check if topic is undefined since input field is not required. do not show if undefined. join is used for separating topic array elements by comma */}
                                    {Object.keys(document.topic).length==0? console.log("[book topic] undefined"): 
                                    (<div className="text-tags">Topic: {Object.values(document.topic).join(", ")}</div>)
                                    }

                                </div>
                            </div>
                        )
                    default: //thesis or sp
                        return(
                            <div className="document-card-container ">
                                <div className="document-card-flex-column">
                                <div className="main-text-tags">{document.type}</div>
                                <div className="main-text-tags">{document.title}</div>
                                <div className="text-tags">Author: {Object.values(authorObj).join(", ")}</div>
 
                                {/* clickable adviser */}
                                <div className="text-tags"> Adviser: 
                                    <ul className="click-list">
                                    {Object.values(adviserObj).map((adviser) => {
                                        return (<button className="click-text" key ={document.id} onClick={handleAdviserClick}>{adviser}</button>)
                                    })}
                                    </ul>
                                </div>
                                
                                <div className="text-tags">Publishing Date: {document.yearPublished}</div>
                                
                                {/* check if topic is undefined since input field is not required. do not show if undefined */}
                                {Object.keys(topicObj).length==0? console.log("[sp/thesis topic] undefined"): 
                                (<div className="text-tags">Topic: {Object.values(topicObj).join(", ")}</div>)
                                }

                                {/* clickable course, if undefined do not show */}
                                {Object.keys(courseObj).length==0? console.log("[sp/thesis course] undefined"): 
                                (<div className="text-tags"> Course: 
                                    <ul className="click-list">
                                    {Object.values(courseObj).map((course) => {
                                        return (<button className="click-text" key ={document.id} onClick={handleCourseClick}>{course}</button>)
                                    })}
                                    </ul>
                                </div>)
                                }

                                {/* check if source code is empty, if not, check if faculty and up to get access to source code */}
                                {document.code == ""? null:
                                userType=="Faculty" || userType=="Staff" || userType=="Admin"?<div className="text-tags">Source Code: <a className="a-tags" href={document.code}>{document.code}</a></div>:null
                                }

                                {(document.file !== '' || document.file !== undefined) && (isPrivileged(userType)) ? <div className="download-buttons"><Button variant="contained" style={{backgroundColor: '#47abd8', color: "white", marginTop: "5%", marginBottom: "5%"}} startIcon={<MenuBookIcon />} onClick={() => downloadFile()}>Download Journal</Button> <Button style={{backgroundColor: '#ff4242', color: "white", marginBottom: "5%"}} startIcon={<FindInPageIcon/>} onClick={() => downloadPoster()}>Download Poster</Button></div> : null}
                                </div>
                            </div>
                        )	
                }
            })(props, uData.classification)
            }
        </div>
    )
}

export default DocumentCard
