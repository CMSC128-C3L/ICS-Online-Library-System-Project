import React from 'react'
import {Link} from 'react-router-dom'
import EditPage from '../components/admin/documents/ManageDocument'
import Header from "../components/header_user/Header"

function AdminDocManagement() {
    return (
        <div>
            <Header></Header>
            <EditPage></EditPage>
        </div>
    )
}

export default AdminDocManagement
