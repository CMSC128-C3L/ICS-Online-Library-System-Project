import React, {useContext, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import { UserContext } from '../../manage_user_popup/Modal'
import axios from 'axios'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import '../../manage_user_popup/styles.css'

function DocListModal(){
    const {user} = useContext(UserContext)
    const [materials, setMaterials] = useState([user.view_doc_logs])
    const history = useHistory()

    const getDocTitle = (oid) => {
        return `Book ${oid}`
    }

    const viewMaterial = (oid) => {
        history.replace(`/search/${oid}`)
    }

    return(
        <div className="popup-container">
            <h2 className="text user-name">{user.name}</h2>
            <h3 className="text prompt">Recently Viewed Documents</h3>
            
            <List className="list-box">
                {
                    user.view_doc_logs.map((log, index) => {
                        return (
                            <ListItem button key={index} onClick={() => viewMaterial(log.doc_oid)}>
                                <ListItemText primary={getDocTitle(log.doc_oid)}/>
                            </ListItem>
                        )
                    })
                }
            </List>
        </div>
    )
}

export default DocListModal
