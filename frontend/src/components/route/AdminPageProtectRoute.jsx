import React, {useContext} from 'react'
import { Redirect, Route } from 'react-router'
import { UserContext } from '../user/UserContext'

function AdminPageProtectRoute({component: Component, ...rest}) {
    const {loggedUser, setLoggedUser} = useContext(UserContext)
    return (
        <Route
            {...rest}

            render={props =>{

                if(loggedUser.classification === 'Admin'){
                    return <Component {...props} />
                } 
                
                else{
                     return <Redirect 
                        to={{
                            pathname: "/error",
                            state: {
                                from: props.location
                            }

                        }}
                    />
                }
                
            }
            }
        />
    )
}

export default AdminPageProtectRoute
