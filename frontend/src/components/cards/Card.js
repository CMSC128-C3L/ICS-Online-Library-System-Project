import './Card.css'

function Card(props){
    return (
        <div>
            <div className="card-header text">{props.content.header}</div>
            <div className="card-container">
                <div className="flex-column">
                    <img className="img" src={props.content.image} alt="sample"></img>
                    <div className="article-title text">{props.content.title}</div>
                    <div className="article-description text">{props.content.description}</div>
                    <a href={props.content.link} target="_blank">
                        <button className="view-button">VIEW</button>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Card