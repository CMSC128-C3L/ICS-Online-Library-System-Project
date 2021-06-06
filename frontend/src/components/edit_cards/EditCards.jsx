import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import CardRow from '../cards/CardRow'
import './EditCards.css'
import EditIcon from '@material-ui/icons/Edit';

function EditCards(props){
    const history = useHistory();

    // set default card state
    const [cards, setCards] = useState({
        advisory: {
            header: "Advisory",
            title: "Lorem ipsum dolor sit amet",
            image: ""
        },
        featured: {
            header: "Featured",
            title: "Lorem ipsum dolor sit amet",
            image: ""
        },
        icsnews: {
            header: "ICS News",
            title: "Lorem ipsum dolor sit amet",
            image: ""
        }
    })

    // Go to edit x page on click of edit button
    const onClickEditCard = (header) => {
        history.push(`/edit${cleanWhitespace(header)}`)
    }

    // Remove whitespaces in string
    const cleanWhitespace = (string) => {
        return string.replace(/\s/g, "");
    }

    return (
        <div className="page-container">
            <div className="btn-cont">
                <div className="edit-btn" onClick={() => onClickEditCard(cards.advisory.header)}><EditIcon/></div>
                <div className="edit-btn" onClick={() => onClickEditCard(cards.featured.header)}><EditIcon/></div>
                <div className="edit-btn" onClick={() => onClickEditCard(cards.icsnews.header)}><EditIcon/></div>
            </div>
            
            <CardRow
                advisory={cards.advisory}
                featured={cards.featured}
                icsnews={cards.icsnews}
            />
        </div>
    )
}

export default EditCards