import './Card.css'
import sample from '../../assets/sample.jpg'

function Card(props){
    return (
        <div className="card card-container flex-column">
            <div className="card-header text">{props.content.header}</div>
            <img src={sample} alt="sample"></img>
            <div className="article-title text">{props.content.title}</div>
            <a href="test">
                <button className="view-button">VIEW</button>
            </a>
        </div>
    )
}

export default Card