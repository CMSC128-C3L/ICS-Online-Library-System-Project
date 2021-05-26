import { useRadioGroup } from '@material-ui/core'
import React, {useContext} from 'react'
import { UserContext } from './Modal'
import './styles.css'

function DeleteUser({ children }){
    const {user} = useContext(UserContext)

    return(
        <div>
            <h1>Delete User: {user.name}</h1>
        </div>
    )
}

export default DeleteUser