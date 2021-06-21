import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/header_user/Header'
import EditCard from '../components/edit_cards/EditCard'
import axios from 'axios'
import featuredImg from '../assets/announcements/Featured.png'
function CardEditingPage() {
    const [card, setCard] = useState()
    const { index } = useParams()
    
    
    const imageExists = (image) =>{
        let img = new Image()
        img.src = image

        
        if(img.complete) {
            return true;
        }
        else return false;
    }

    
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
        
    }, [index])

    useEffect(() => {
    }, [card]);

    return (
        <div>
            <Header></Header>
            {card
                ? <EditCard card={card}></EditCard>
                : null
            }
        </div>
    )
}

export default CardEditingPage
