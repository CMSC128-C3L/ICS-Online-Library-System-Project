import './DocumentCard.css'

function DocumentCard(props){
    return (
        <div>
            {
            (function(document){
                console.log("document card value: ", document.type)
                switch(document.type){
                    case "Book":
                        return(
                            <div className="document-card-container ">
                                <div className="document-card-flex-column">
                                <div className="main-text-tags">{document.type}</div>
                                <div className="main-text-tags">{document.title}</div>
                                <div className="text-tags">Author: {document.author}</div>
                                <div className="text-tags">Year Published: {document.yearPublished}</div>
                                <div className="text-tags">Publisher: {document.publisher}</div>
                                <div className="text-tags">ISBN: {document.docISBN}</div>
                                </div>
                            </div>
                        )
                    default: //thesis or sp
                        return(
                            <div className="document-card-container ">
                                <div className="document-card-flex-column">
                                <div className="main-text-tags">{document.type}</div>
                                <div className="main-text-tags">{document.title}</div>
                                <div className="text-tags">Author: {document.author}</div>
                                <div className="text-tags">Adviser: {document.adviser}</div>
                                <div className="text-tags">Publishing Date: {document.yearPublished}</div>
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