import React, {useContext} from 'react'
import { Redirect, Route } from 'react-router'
import { UserContext } from '../user/UserContext'

function HomePageRoute({component: Component, ...rest}) {
    const {loggedUser, setLoggedUser} = useContext(UserContext)
    return (
        <Route
            {...rest}
            render={props => {
                if(loggedUser.classification === 'Admin'){
                    return <Component {...props} />
                }

                //if user is not empty, it means there is a non-admin logged in user
                else if(JSON.stringify(loggedUser) !== '{}'){
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
