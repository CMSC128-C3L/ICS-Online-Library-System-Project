import Card from './Card'
import { useEffect, useState } from 'react'
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios'

function CardRow({edit, handleEdit}){
    const [cards, setCards] = useState([])

    useEffect(() => {
        let announcements;
        const getCards = async () => {
            try{
                announcements = await axios.get('/api/advisory/')
                setCards(announcements.data)
            }catch(e){console.log("error in card fetching")}
        }
        getCards();
    }, [])

    return (
        <div className='flex-row margin-v'>
            {cards.map((card, index) => {
                return (
                    <div className='flex-col' key={index}>
                        {edit? <div className="edit-btn" onClick={() => handleEdit(index)}><EditIcon/></div> : null}
                        <Card content={card}/>
                    </div>
                )
            })}
        </div>
    )
}

export default CardRow