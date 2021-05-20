import './DocumentCard.css'

function DocumentCard(props){
    return (
        <div className="document-card-flex-column">
            <text className="main-text-tags">Book</text>
            <text className="main-text-tags">Title: {props.title}</text>
            <text className="text-tags">Author: {props.author}</text>
            <text className="text-tags">Year Published: {props.yearPublished}</text>
            <text className="text-tags">Publisher: {props.publisher}</text>
            <text className="text-tags">ISBN: {props.docISBN}</text>
        </div>
    )
}

export default DocumentCard



