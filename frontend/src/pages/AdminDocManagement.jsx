import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import EditPage from '../components/manage_document/ConditionalEdit'
import Header from "../components/header_user/Header"
import bg from '../../assets/icsmh.png';

function AdminDocManagement({match}) {

    return (
        <div style = {{
            backgroundImage: `url(${bg})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            minHeight: '50vh'}}>
        
        {/* <div style={{
            background-image: url();
            background-repeat: no-repeat;
            background-size:cover;
            background-position: center;
            min-height: 50vh;

        }}> */}
            <Header></Header>
            <EditPage/>
        </div>
    )
}

export default AdminDocManagement