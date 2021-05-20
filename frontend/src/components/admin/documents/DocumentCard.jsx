import './DocumentCard.css'

function DocumentCard(props){
    return (
        <div className="document-card-container document-card-flex-column">
        <img src={props.thumbnail} className='document-thumbnail' alt=""></img>
            <h5>Title: {props.title}</h5>
            <h5>Author: {props.author}</h5>
            <h5>Year Published: {props.yearPublished}</h5>
            <h5>Publisher: {props.publisher}</h5>
            <h5>ISBN: {props.docISBN}</h5>
        </div>
    )
}

export default DocumentCard

