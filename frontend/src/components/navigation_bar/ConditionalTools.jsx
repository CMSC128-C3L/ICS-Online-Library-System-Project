import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router';
import { UserContext } from '../user/UserContext';

/**
 * functional component 
 * conditionally render pages depending on the type of user
 * links will redirect to the page
 */

function ConditionalTools(){
  const loggedUser = useContext(UserContext);
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
                  <Button className="a" onClick={() => history.push('/adminHome/manageDocuments')}>Home</Button>
                  {/* <a href="/adminHome">HOME</a>
                  <a href="/adminHome/manageDocuments">BROWSE</a> */}
                </div>
              )
            default:
              return(
                <div className="links">
                  <Button className="a" onClick={() => history.push('/')}>Home</Button>
                  <Button className="a" onClick={() => history.push('/search')}>Browse</Button>
                  {/* <a href="/">HOME</a>
                  <a href="/search">BROWSE</a> */}
                </div>
              )	
          }
        })(loggedUser.classification)
    }
    </div>
  )
	
}

export default ConditionalTools;