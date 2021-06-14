import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom';
import decode from 'jwt-decode';

/**
 * functional component 
 * conditionally render pages depending on the type of user
 * links will redirect to the page
 */

function ConditionalTools(){
  const data = (localStorage.length != 0) ? decode(localStorage.getItem('token')) : '{}'
  const history = useHistory();
  
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
                  
                  <Button className="a" onClick={() => history.push('/')}>Home</Button>
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