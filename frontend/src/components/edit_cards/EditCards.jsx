import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import CardRow from '../cards/CardRow'
import './EditCards.css'

function EditCards(props){
    const history = useHistory();
    const [cards, setCards] = useState({}) // set default card state

    // Go to edit x page on click of edit button
    const onClickEditCard = (index) => {
        history.push(`/adminHome/manageAnnouncements/${index}`)
    }

    return (
        <div className="page-container">
            <CardRow edit={true} handleEdit={onClickEditCard}/>
        </div>
    )
}

export default EditCards