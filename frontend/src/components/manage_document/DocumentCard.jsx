import React, {useContext} from 'react';
import { UserContext } from '../user/UserContext'
import './DocumentCard.css'

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

// functional component to render the details in document card format 
// used in accessing document
function DocumentCard(props){
    //method for assigning props to object (for mapping values) 
    const {loggedUser, setLoggedUser} = useContext(UserContext); 
    let authorObj = {},topicObj = {},courseObj = {},adviserObj = {};
    Object.assign(adviserObj, props.adviser)
    Object.assign(topicObj, props.topic)
    Object.assign(courseObj, props.course)
    Object.assign(authorObj, props.author)
    
    return (
        <div>
            {
            (function(document, userType){
                console.log("[docard] document course: ", document.course)
                console.log("[docard] user type: ", userType)
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

                                {userType=="Faculty" || userType=="Staff" || userType=="Admin"?<div className="text-tags">Source Code: <a className="a-tags" href={document.code}>{document.code}</a></div>:null}
                                </div>
                            </div>
                        )	
                }
            })(props, loggedUser.classification)
            }
        </div>
    )
}

export default DocumentCard