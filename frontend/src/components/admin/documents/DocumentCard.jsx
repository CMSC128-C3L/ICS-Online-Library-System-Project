import './DocumentCard.css'

function DocumentCard(props){
    return (
        <div className="card card-container flex-column">
            <img src={props.thumbnail}alt="thumbnail"></img>
            <div className="article-title text">{props.title}</div>
            <div className="card-header text">{props.header}</div>
            <a href="test">
                <button className="view-button text">VIEW</button>
            </a>
        </div>
    )
}

export default DocumentCard