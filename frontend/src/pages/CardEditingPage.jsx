import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/header_user/Header'
import EditCard from '../components/edit_cards/EditCard'
import axios from 'axios'

function CardEditingPage() {
    const [card, setCard] = useState({})
    const { index } = useParams()
    
    // Get all cards but use only {index}'th card
    useEffect(() => {
        let announcements;
        const getCard = async () => {
            try{
                announcements = await axios.get('/api/advisory/')
                setCard(announcements.data[index])
            }catch(e){console.log("error in card fetching")}
        }
        getCard();
    }, [])

    return (
        <div>
            <Header></Header>
            <EditCard card={card}></EditCard>
        </div>
    )
}

export default CardEditingPage
