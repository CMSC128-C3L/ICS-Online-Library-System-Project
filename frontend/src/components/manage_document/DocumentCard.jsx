import './DocumentCard.css'

function DocumentCard(props){
    return (
        <div className="document-card-flex-column">
            <div className="main-text-tags">{props.classification}</div>
            <div className="main-text-tags">Title: {props.title}</div>
            <div className="text-tags">Author: {props.author}</div>
            <div className="text-tags">Year Published: {props.yearPublished}</div>
            <div className="text-tags">Publisher: {props.publisher}</div>
            <div className="text-tags">ISBN: {props.docISBN}</div>
        </div>
    )
}

export default DocumentCard



