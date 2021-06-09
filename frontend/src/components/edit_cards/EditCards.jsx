import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import CardRow from '../cards/CardRow'
import './EditCards.css'
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';

function EditCards(props){
    const history = useHistory();
    const [cards, setCards] = useState({}) // set default card state

    useEffect(() => {
        const getCards = async () => {
            try{
                const announcements = await axios.get('/api/advisory/')
                setCards(announcements.data)
                console.log(cards)
            }catch(e){
                console.log("error pre")
            }
        }
        getCards();
    }, [])

    // Go to edit x page on click of edit button
    const onClickEditCard = (index) => {
        console.log(cards, index)
        history.push(`/adminHome/manageAnnouncements/${index}`)
    }

    // Remove whitespaces in string
    const cleanWhitespace = (string) => {
        return string.replace(/\s/g, "");
    }

    return (
        <div className="page-container">
            <div className="btn-cont">
                <div className="edit-btn" onClick={() => onClickEditCard(0)}><EditIcon/></div>
                <div className="edit-btn" onClick={() => onClickEditCard(1)}><EditIcon/></div>
                <div className="edit-btn" onClick={() => onClickEditCard(2)}><EditIcon/></div>
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