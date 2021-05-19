import React from 'react';

const DocumentCard = (props) =>{
    return(
        <div className="card-container">
            <img src={} alt=""/>
            <div className="desc">
                <h2>{props.title}</h2>
                <h3>{props.author}</h3>
                <p>{props.published}</p>
            </div>
        </div>
    )
}

export default DocumentCard;