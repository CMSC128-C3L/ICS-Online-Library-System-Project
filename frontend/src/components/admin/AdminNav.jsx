import React from 'react'
import AdminButton from './AdminButton'
import AdminButtonIcon from './AdminButtonIcon'
import peopleIcon from '../../assets/manageUserIcon.png'
import docIcon from '../../assets/manageDocIcon.png'
import analyticsIcon from '../../assets/manageAnalytics.png'
import AdminAnalyticsTile from './AdminAnalyticsTile'
import navStyle from './AdminHome.css'

function AdminNav() {
    return (
        <div className="bg bg-container">
            <AdminAnalyticsTile></AdminAnalyticsTile>
            <div className="nav nav-container">
                <AdminButton title="Manage documents" description="Create, update, and delete documents (journals, books, etc.)" link="manageDocuments"> 
                    <AdminButtonIcon>
                        <img src={docIcon} alt=""></img>
                    </AdminButtonIcon>
                </AdminButton>
            
                <AdminButton  title="Manage users" description="Manage user privileges" link="manageUsers">
                    <AdminButtonIcon>
                        <img src={peopleIcon} alt=""></img>
                    </AdminButtonIcon>
                </AdminButton>
            
                <AdminButton title="Check analytics" description="Browse in-depth analytics of your website" link="browseAnalytics">
                        <AdminButtonIcon>
                            <img src={analyticsIcon} alt=""></img>
                        </AdminButtonIcon>
                </AdminButton>
                    
            </div>
           
       </div>
    )
}

export default AdminNav
