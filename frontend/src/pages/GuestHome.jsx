import React, { useContext, useEffect } from 'react'
import Header from '../components/header_user/Header'
import Search from '../components/search/Search'
import CardRow from '../components/cards/CardRow'
import {UserContext} from '../components/user/UserContext'

export const ACTIONS = {
  updateQuery: 'UPDATE_QUERY',
  updateCategory: 'UPDATE_CATEGORY',
  updateCourseCode: 'UPDATE_COURSE_CODE',
  updateTopic: 'UPDATE_TOPIC',
  reset: 'RESET'
}




function GuestHome() {
    const {loggedUser, setLoggedUser} = useContext(UserContext) 

    //check to see if user is still logged in
        useEffect(() => {
            console.log('user', loggedUser)
        }, [])

    return (
        <div>
            <Header/>
            <Search action={ ACTIONS.updateQuery }/>
            <CardRow/>
        </div>
    )


    
}

export default GuestHome
