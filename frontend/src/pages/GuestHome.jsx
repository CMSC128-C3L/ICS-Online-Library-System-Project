import React, { useContext, useEffect } from 'react'
import Header from '../components/header_user/Header'
import Search from '../components/search/Search'
import CardRow from '../components/cards/CardRow'
import {UserContext} from '../components/user/UserContext'
import bg from '../assets/physci1.png';

export const ACTIONS = {
  updateQuery: 'UPDATE_QUERY',
  updateCategory: 'UPDATE_CATEGORY',
  updateCourseCode: 'UPDATE_COURSE_CODE',
  updateTopic: 'UPDATE_TOPIC',
  reset: 'RESET'
}


function GuestHome() {
    const {loggedUser, setLoggedUser} = useContext(UserContext) 



    return (
        <div style = {{
            backgroundImage: `url(${bg})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundPositionY: '-0.25cm'}}>
            <Header/>
            <Search action={ ACTIONS.updateQuery }/>
            <CardRow/>
        </div>
    )


    
}

export default GuestHome
