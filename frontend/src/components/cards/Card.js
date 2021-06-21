import './Card.css'
import advisoryImg from '../../assets/announcements/Advisory.png'
import featuredImg from '../../assets/announcements/Featured.png'
import newsImg from '../../assets/announcements/News.png'
function Card(props){

    const imageExists = () =>{
        let img = new Image()
        img.src = props.content.image

        if(img.complete) return true;
        else return false;
    }

 
    return (
        <div className="margin-bot-2">
            <div className="card-header text">{props.content.header}</div>
            <div className="card-container">
                <div className="flex-column">
                    {imageExists() ? (<img className="card-img" src={props.content.image} alt="sample"></img>) : 
                    (function(contentType){
                        switch(contentType){
                            case "Advisory":
                                return  (<img className="card-img" src={advisoryImg} alt="sample"></img>)
                            case "News":
                                return  (<img className="card-img" src={newsImg} alt="sample"></img>)
                            case "Featured":
                                return  (<img className="card-img" src={featuredImg} alt="sample"></img>)
                        }   
                    })(props.content.header)}
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