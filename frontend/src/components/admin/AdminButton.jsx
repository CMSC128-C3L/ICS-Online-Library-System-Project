import { CardActionArea, CardContent } from '@material-ui/core'
import React from 'react'
import './AdminHome.css'
import Card from '@material-ui/core/Card'
import {useHistory} from 'react-router-dom'
import AdminButtonIcon from './AdminButtonIcon'
function AdminButton({children, title, link, description}) {
     const history = useHistory();
    return (
       
        <Card className="adminbutton" 
            onClick={() => history.push('/'+ link)}
            style={{borderRadius: '1em'}}
        >
            <CardActionArea> 
                <CardContent>
                    <AdminButtonIcon>{children}</AdminButtonIcon>
                    <h3 className="title">{title}</h3>
                    <p className="description">{description}</p>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default AdminButton
