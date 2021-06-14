import React, {useContext} from 'react'
import { Redirect, Route } from 'react-router'
import { UserContext } from '../user/UserContext'
import decode from 'jwt-decode';

function HomePageRoute({component: Component, ...rest}) {
    const {loggedUser, setLoggedUser} = useContext(UserContext)
    const data = (localStorage.length != 0) ? decode(localStorage.getItem('token')) : '{}'
    return (
        <Route
            {...rest}
            render={props => {
                if(data.classification === 'Admin'){
                    return <Component {...props} />
                }

                //if user is not empty, it means there is a non-admin logged in user
                else if(data !== '{}'){
                    return <Redirect
                        to={{
                            pathname: '/loggedIn',
                            state: {
                                from: props.location
                            }
                        }}
                    />
                }

                else{
                    return <Redirect 
                        to={{
                            pathname: "/",
                            state: {
                                from: props.location
                            }

                        }}
                    />
                }
            }}
        />
    )
}

export default HomePageRoute
