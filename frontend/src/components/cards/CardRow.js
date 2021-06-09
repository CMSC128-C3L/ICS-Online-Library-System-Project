import Card from './Card'
import { useEffect, useState } from 'react'
import axios from 'axios'

function CardRow(){
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
        <div className='flex-row'>
            {cards.map(card => {
                return <Card content={card}/>
            })}
        </div>
    )
}

export default CardRow