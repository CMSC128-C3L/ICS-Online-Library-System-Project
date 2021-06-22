import React from 'react'
import {Link} from 'react-router-dom'
import ConditionalEdit from '../components/manage_document/ConditionalEdit'
import Header from "../components/header_user/Header"
import bg from '../assets/icsmh.png';

function EditDocument() {
    return (
        <div style = {{
            backgroundImage: `url(${bg})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            minHeight: '50vh'}}>
            <Header></Header>
            <ConditionalEdit/>
        </div>
    )
}

export default EditDocument
