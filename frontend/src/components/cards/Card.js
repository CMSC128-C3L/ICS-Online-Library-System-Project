import './Card.css'

function Card(props){
    return (
        <div className="margin-bot-2">
            <div className="card-header text">{props.content.header}</div>
            <div className="card-container">
                <div className="flex-column">
                    <img className="card-img" src={props.content.image} alt="sample"></img>
                    <div className="article-title opensans">{props.content.title}</div>
                    <div className="article-description montserrat">{props.content.description}</div>
                    <a href={props.content.link} target="_blank" rel="noreferrer">
                        <button className="opensans view-button">VIEW</button>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Card