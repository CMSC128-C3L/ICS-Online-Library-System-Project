import React from 'react'
import AdminButton from './AdminButton'
import peopleIcon from '../../assets/manageUserIcon.png'
import docIcon from '../../assets/manageDocIcon.png'
import analyticsIcon from '../../assets/manageAnalytics.png'
import AdminAnalyticsTile from './AdminAnalyticsTile'
import navStyle from './AdminHome.css'


function AdminNav() {
    return (
        <div className="adminbg adminbg-container">
            
            <div className="nav nav-container">
                <AdminButton title="Manage documents" description="Create, update, and delete documents (journals, books, etc.)" link="manageDocuments"> 
                    <img src={docIcon} alt=""></img>
                </AdminButton>

                <AdminButton  title="Manage users" description="Manage user privileges" link="manageUsers">
                    <img src={peopleIcon} alt=""></img>                 
                </AdminButton>
            
                <AdminButton title="Check analytics" description="Browse in-depth analytics of your website" link="browseAnalytics">
                    <img src={analyticsIcon} alt=""></img>
                </AdminButton>
                    
            </div>
           
       </div>
    )
}

export default AdminNav
