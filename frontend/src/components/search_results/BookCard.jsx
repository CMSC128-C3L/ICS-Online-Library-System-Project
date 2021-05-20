import './BookCard.css'
import EditDocument from '../admin/documents/ManageDocument';

function BookCard(props){
    return (
        <div className="card card-container flex-column">
            <img src={props.thumbnail}alt="thumbnail"></img>
            <div className="article-title text">{props.title}</div>
            <div className="card-header text">{props.author}</div>
            <h3>{props.publishedDate}</h3>
            <a href="/manageDocuments">
                <button className="view-button text">EDIT</button>
            </a>
        </div>
    )
}

export default BookCard