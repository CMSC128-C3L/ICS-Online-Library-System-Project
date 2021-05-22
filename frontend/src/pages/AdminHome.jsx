import React from 'react'
import AdminNav from '../components/admin/AdminNav'
import Header from '../components/header_user/Header'

function AdminHome(props) {
    return (
        <div>
            <Header name={props.match.params.id}></Header>
            <AdminNav></AdminNav>
        </div> 
        
    )
}

export default AdminHome

