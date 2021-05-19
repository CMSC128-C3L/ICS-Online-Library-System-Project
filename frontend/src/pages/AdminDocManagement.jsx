import React from 'react'
import {Link} from 'react-router-dom'
import UserTable from '../components/admin/documents/ManageDocument'
import Header from "../components/header_user/Header"

function AdminDocManagement() {
    return (
        <div>
            <Header></Header>
            <UserTable></UserTable>
        </div>
    )
}

export default AdminDocManagement
