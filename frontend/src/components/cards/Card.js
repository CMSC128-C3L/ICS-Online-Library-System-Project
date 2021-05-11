import './Card.css'

function Card(props){
    return (
        <div className="card card-container">
            <CardHeader>{props.children}</CardHeader>
            <div className="placeholder-image"></div>
        </div>
    )
}

function CardHeader(props){
    return (
        <div className="card-header">{props.children}</div>
    )
}

export default Card