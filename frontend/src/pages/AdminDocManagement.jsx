import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import EditPage from '../components/manage_document/ConditionalEdit'
import Header from "../components/header_user/Header"

function AdminDocManagement({match}) {
    useEffect(() => {
        console.log(match.params.id)
    })
    return (
        <div>
            <Header></Header>
            <EditPage/>
        </div>
    )
}

export default AdminDocManagement