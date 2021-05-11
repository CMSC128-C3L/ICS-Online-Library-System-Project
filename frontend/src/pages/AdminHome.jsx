import React from 'react'
import Button from '@material-ui/core/Button'
import {makeStyles, ThemeProvider, createMuiTheme, easing} from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
import Box from '@material-ui/core/Box'
import theme from '../components/AdminTheme'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import { CardContent } from '@material-ui/core'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import AdminAnalytics from './AdminAnalytics'
import AdminDocManagement from './AdminDocManagement'
import AdminUserManagement from './AdminUserManagement'
import background from '../assets/adminBackground.png'
const useStyles = makeStyles({
    root: { 
        border: 0,
        color: 'black',
        border: 1,
        borderColor: '#47abd8',
        borderStyle: 'solid',
        borderRadius: 20,
    },

    button: {
        background: 'white',
        height: '250px',
        maxheight: '250px',
        width: '315px',
        maxwidth: '315px',
        cursor: 'pointer',
        '&:hover':{
            background: '#47abd8',
            color: 'white'
        }        
    },

    analyticsTile: {

        background: '#47abd8',
        height: '250px',
        maxheight: '250px',
        width: '1000px',
        maxwidth: '1000px'
    },

    circle: {
        border: 1,
        borderColor: '#47abd8',
        borderStyle: 'solid',
        borderRadius: 100,
        background: 'white',
        width: '50px',
        maxwidth: '50px',
        height: '50px',
        maxheight: '50px',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto'
    }
})



function AdminHome() {
    const buttonStyle = useStyles()
    return (
        <div>

            <div style={{ 
                backgroundImage: `url(${background})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover'
            }}>
                <Router>
                    <Switch>
                    <Grid container spacing={2} justify="center" direction="column" alignItems="center">
                        <Grid item>
                            <Card className={[buttonStyle.root, buttonStyle.analyticsTile].join(' ')}>ANALYTICS HERE</Card>
                        </Grid>
                        <Grid item>
                        <Grid container spacing={2} justify="center">
                            <Grid item>
                                   <Card className={[buttonStyle.button, buttonStyle.root].join(' ')}>
                                    <CardContent>
                                            <Box className={buttonStyle.circle}>
                                                <SaveIcon style={{ fontSize: 25, color: 'black' }}/>
                                            </Box>
                                            <h3>Manage documents</h3>
                                            <subtitle1>Create, update, and delete documents (journals, books, etc.)</subtitle1>
                                    </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item>
                                        <Card className={[buttonStyle.button, buttonStyle.root].join(' ')}>
                                            <CardContent>
                                                <Box className={buttonStyle.circle}>
                                                    <SaveIcon style={{ fontSize: 25, color: 'black' }}/>
                                                </Box>
                                                <h3>Manage users</h3>
                                                <subtitle1>Manage user privileges</subtitle1>
                                            </CardContent>   
                                        </Card>
                                </Grid>
                                <Grid item>
                                        <Card className={[buttonStyle.button, buttonStyle.root].join(' ')}>
                                            <CardContent>
                                                <Box className={buttonStyle.circle}>
                                                    <SaveIcon style={{ fontSize: 25, color: 'black' }}/>
                                                </Box>
                                                <h3>Check analytics</h3>
                                                <subtitle1>Browse in-depth analytics of your website    </subtitle1>
                                            </CardContent>
                                        </Card>
                                </Grid>
                            </Grid>
                        </Grid> 
                    </Grid>
                    

                    
                        <Route exact path="/manageUsers"  component={AdminUserManagement} />
                        <Route exact path="/manageDocuments"  component={AdminDocManagement} />
                        <Route exact path="/browseAnalytics" component={AdminUserManagement} />

                    </Switch>
                </Router>

            </div>
            

        </div>
        
       
        
    )
}

export default AdminHome

