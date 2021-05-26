import React from 'react'
import { UserContext } from './Modal'
import './styles.css'

// Edit User UI, user state is from parent Modal
function EditUser({ children }){
    return(
        <UserContext.Consumer>
            {(user) => {
                // TODO: 
                return (
                    <div>
                        {user.name}
                    </div>
                )
            }}
        </UserContext.Consumer>
    )
}

export default EditUser