import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import CardRow from '../cards/CardRow'
import './EditCards.css'
import EditIcon from '@material-ui/icons/Edit';

function EditCards(props){
    const history = useHistory();
    const [cards, setCards] = useState({}) // set default card state

    // Go to edit x page on click of edit button
    const onClickEditCard = (index) => {
        console.log(cards, index)
        history.push(`/adminHome/manageAnnouncements/${index}`)
    }

    return (
        <div className="page-container">
            <div className="btn-cont">
                <div className="edit-btn" onClick={() => onClickEditCard(0)}><EditIcon/></div>
                <div className="edit-btn" onClick={() => onClickEditCard(1)}><EditIcon/></div>
                <div className="edit-btn" onClick={() => onClickEditCard(2)}><EditIcon/></div>
            </div>
            
            <CardRow/>
        </div>
    )
}

export default EditCards