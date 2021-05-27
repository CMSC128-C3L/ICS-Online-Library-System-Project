import React, {useContext} from 'react'
import { UserContext } from './Modal'
import './styles.css'

// Edit User UI, user state is from parent Modal
function EditUser({ children }){
    const {user} = useContext(UserContext);
    
    return(
        <div>
            <h1>Edit User: {user.name}</h1>
        </div>
    )
}

export default EditUser