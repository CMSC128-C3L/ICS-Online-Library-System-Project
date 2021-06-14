import React, {useContext} from 'react'
import { Redirect, Route } from 'react-router'
import decode from 'jwt-decode';

function AdminPageProtectRoute({component: Component, ...rest}) {
    const data = (localStorage.length != 0) ? decode(localStorage.getItem('token')) : '{}';
    return (
        <Route
            {...rest}

            render={props =>{

                if(data.classification === 'Admin'){
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
