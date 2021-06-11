import '../search_results/SearchCard.css'
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
    let authorObj = {},topicObj = {},courseObj = {},adviserObj = {};

    return (
        <div>
            {
            (function(document){
                console.log("document card value: ", typeof(document.topic))
                switch(document.type){
                    case "Book": //book
                        return(
                            <div className="document-card-container ">
                                <div className="document-card-flex-column">
                                <div className="main-text-tags">{document.type}</div>
                                <div className="main-text-tags">{document.title}</div>
                                <div className="text-tags">Author: {Object.values(document.author).join(", ")}</div>
                                <div className="text-tags">Year Published: {document.yearPublished}</div>
                                <div className="text-tags">Publisher: {document.publisher}</div>
                                <div className="text-tags">ISBN: {document.docISBN}</div>
                                <div className="text-tags">Course: {Object.values(document.course).join(", ")}</div>
                                <div className="text-tags">Topic: {Object.values(document.topic).join(", ")}</div>
                                </div>
                            </div>


                        )
                    default: //thesis or sp
                        return(
                            <div className="document-card-container ">
                                <div className="document-card-flex-column">
                                <div className="main-text-tags">{document.type}</div>
                                <div className="main-text-tags">{document.title}</div>
                                <div className="text-tags">Author: {Object.assign(authorObj, document.author), Object.values(authorObj).join(", ")}</div>
                                <div className="text-tags">Adviser: {Object.assign(adviserObj, document.adviser), Object.values(adviserObj).join(", ")}</div>
                                <div className="text-tags">Publishing Date: {document.yearPublished}</div>
                                <div className="text-tags">Course: {Object.assign(courseObj, document.course_code), Object.values(courseObj).join(", ")}</div>
                                <div className="text-tags">Topic: {Object.assign(topicObj, document.topic), Object.values(topicObj).join(", ")}</div>
                                </div>
                            </div>
                        )	
                }
            })(props)
            }
        </div>
    )
}

export default DocumentCard