import { CardActionArea, CardContent } from '@material-ui/core'
import React from 'react'
import './AdminButton.css'
import Card from '@material-ui/core/Card'
import {useHistory} from 'react-router-dom'

function AdminButton({children, title, link, description}) {
     const history = useHistory();
    return (
       
        <Card className="adminbutton adminbutton-container" 
            onClick={() => history.push('/'+ link)}
            style={{borderRadius: '1em'}}
        >
            <CardActionArea>    
                <CardContent>
                    {children}
                   <h3>{title}</h3>
                    <p>{description}</p>
                </CardContent>
            </CardActionArea>
            
        </Card>
    )
}

export default AdminButton
