import React from 'react'
import {Link} from 'react-router-dom'
import ConditionalEdit from '../components/manage_document/ConditionalEdit'
import Header from "../components/header_user/Header"

function EditDocument() {
    return (
        <div>
            <Header></Header>
            <ConditionalEdit/>
        </div>
    )
}

export default EditDocument
