import React from 'react'
import AdminNav from '../components/admin/AdminNav'
import Header from '../components/header/Header'
import Logout from '../components/login/Logout'

function AdminHome() {
    return (
        <div>
            <Header></Header>
            <Logout></Logout>
            <AdminNav></AdminNav>
        </div> 
        
    )
}

export default AdminHome

