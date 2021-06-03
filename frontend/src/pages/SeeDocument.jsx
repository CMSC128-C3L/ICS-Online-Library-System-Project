import React from 'react'
import {Link} from 'react-router-dom'
import ConditionalEdit from '../components/manage_document/ConditionalEdit'
import Header from "../components/header_user/Header"

function SeeDocument() {
    return (
        <div>
            <Header></Header>
            <ConditionalEdit/>
        </div>
    )
}

export default SeeDocument
