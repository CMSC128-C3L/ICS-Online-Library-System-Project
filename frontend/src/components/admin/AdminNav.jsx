import React from 'react'
import Grid from '@material-ui/core/Grid'
import background from '../../assets/adminBackground.png'
import AdminButton from './AdminButton'
import AdminButtonIcon from './AdminButtonIcon'
import peopleIcon from '../../assets/manageUserIcon.png'
import docIcon from '../../assets/manageDocIcon.png'
import analyticsIcon from '../../assets/manageAnalytics.png'
import AdminAnalyticsTile from './AdminAnalyticsTile'

function AdminNav() {
    return (
        <div style={{ 
                backgroundImage: `url(${background})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover'
        }}>
            <Grid container justify="center" spacing={2} direction="column" alignItems="center">
                <Grid item>
                    <AdminAnalyticsTile></AdminAnalyticsTile>
                </Grid>
                <Grid item>
                    <Grid container justify="center" spacing={2}>
                        <Grid item>
                            <AdminButton 
                                title="Manage documents"
                                description="Create, update, and delete documents (journals, books, etc.)"
                                link="manageDocuments"
                            > 
                                <AdminButtonIcon>
                                    <img src={docIcon} alt=""></img>
                                </AdminButtonIcon>

                            </AdminButton>
                        </Grid>

                         <Grid item>
                             <AdminButton 
                                title="Manage users"
                                description="Manage user privileges"
                                link="manageUsers"
                            >
                                 <AdminButtonIcon>
                                    <img src={peopleIcon} alt=""></img>
                                </AdminButtonIcon>
                            </AdminButton>
                        </Grid>

                        <Grid item>
                             <AdminButton 
                                title="Check analytics"
                                description="Browse in-depth analytics of your website"
                                link="browseAnalytics"
                            >
                                 <AdminButtonIcon>
                                    <img src={analyticsIcon} alt=""></img>
                                </AdminButtonIcon>
                            </AdminButton>
                        </Grid>
                    </Grid> 
                </Grid>
            </Grid>
           
       </div>
    )
}

export default AdminNav
