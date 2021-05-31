import React from 'react'
import {Link} from 'react-router-dom'
import ManageDocument from '../components/manage_document/ManageDocument'
import Header from "../components/header_user/Header"

function SeeDocument() {
    return (
        <div>
            <Header></Header>
            <ManageDocument/>
        </div>
    )
}

export default SeeDocument
