import React, {forwardRef, useCallback, useContext, useImperativeHandle, useState} from 'react'
import { UserContext } from './Modal'
import './styles.css'

function DeleteUser({ children }){
    return(
        <UserContext.Consumer>
            {(user) => {
                return (
                    <div>
                        {user.name}
                    </div>
                )
            }}
        </UserContext.Consumer>
    )
}

export default DeleteUser