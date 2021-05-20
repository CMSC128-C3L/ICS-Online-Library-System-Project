import './DocumentCard.css'

function DocumentCard(props){
    return (
        <div className="document-card-container document-card-flex-column">
            <text>Title: {props.title}</text>
            <text>Author: {props.author}</text>
            <text>Year Published: {props.yearPublished}</text>
            <text>Publisher: {props.publisher}</text>
            <text>ISBN: {props.docISBN}</text>
        </div>
    )
}

export default DocumentCard

