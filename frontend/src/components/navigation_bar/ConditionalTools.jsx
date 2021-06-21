import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom';
import decode from 'jwt-decode';
import SearchContext from '../search_results/SearchContext'
import updateQueryString from '../search_results/UpdateQueryString';
export const ACTIONS = {
    updateQuery: 'UPDATE_QUERY',
    updateCategory: 'UPDATE_CATEGORY',
    updateCourseCode: 'UPDATE_COURSE_CODE',
    updateTopic: 'UPDATE_TOPIC',
    reset: 'RESET',
    reset2: 'RESET2'
}

/**
 * functional component 
 * conditionally render pages depending on the type of user
 * links will redirect to the page
 */

function ConditionalTools(){
  const data = (localStorage.length != 0) ? decode(localStorage.getItem('token')) : '{}'
  const history = useHistory();
  const searchContext = useContext(SearchContext);
  const resetChange = () => (
    console.log('memomeowm'),
    searchContext.dispatch({ type: ACTIONS.reset2 }),
    updateQueryString(searchContext),
    console.log(searchContext.state.category),
    history.push('/')
  )
  
  return(
    <div className="button-links">
      {
        (function(userType){
          switch(userType){
            case "Admin":
              return(
                <div className="links">
                  <Button className="a" onClick={() => history.push('/adminHome')}>Home</Button>
                  <Button className="a" onClick={() => history.push('/adminHome/manageDocuments')}>Browse</Button>
                </div>
              )
            default:
              return(
                <div className="links">
                  
                  <Button className="a" onClick={() => resetChange()}>Home</Button>
                  <Button className="a" onClick={() => history.push('/search')}>Browse</Button>
                </div>
              )	
          }
        })(data.classification)
    }
    </div>
  )
	
}

export default ConditionalTools;