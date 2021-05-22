import React from 'react'
import UserTable from '../components/admin/users/UserTable'
import Header from "../components/header_user/Header"

function AdminUserManagement() {
    return (
        <div>
            <Header></Header>
            <UserTable></UserTable>
        </div>
    )
}

export default AdminUserManagement
