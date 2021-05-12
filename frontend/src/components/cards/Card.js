import './Card.css'

function Card(props){
    return (
        <div className="card card-container flex-column">
            <div className="card-header text">{props.content.header}</div>
            <div className="placeholder-image"></div>
            <div className="article-title text">{props.content.title}</div>
            <a href="test">
                <button className="view-button text">VIEW</button>
            </a>
        </div>
    )
}

export default Card