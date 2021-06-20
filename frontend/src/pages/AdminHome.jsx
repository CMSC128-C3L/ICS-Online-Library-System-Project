import React from 'react'
import AdminNav from '../components/admin/AdminNav'
import Header from '../components/header_user/Header'
import bg from '../assets/adminBackground.png';

function AdminHome(props) {
    return (
        <div style = {{backgroundImage: `url(${bg})`,backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
            <Header name={props.match.params.id}></Header>
            <AdminNav></AdminNav>
        </div> 
        
    )
}

export default AdminHome

