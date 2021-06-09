import React from 'react'
import Header from '../components/header_user/Header'
import EditCard from '../components/edit_cards/EditCard'

function CardEditingPage() {
    return (
        <div>
            <Header></Header>
            <EditCard card={{
                header: "Advisory",
                title: "Lorem ipsum dolor sit amet",
                link: "",
            }}></EditCard>
        </div>
    )
}

export default CardEditingPage
