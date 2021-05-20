import './DocumentCard.css'

function DocumentCard(props){
    return (
        <div className="document-card-container document-card-flex-column">
            <img src={props.thumbnail} className='document-thumbnail' alt=""></img>
            <h5>{props.title}</h5>
            <h5>{props.author}</h5>
            <h5>{props.yearPublished}</h5>
            <h5>{props.publisher}</h5>
            <h5>{props.docISBN}</h5>
        </div>
    )
}

export default DocumentCard

