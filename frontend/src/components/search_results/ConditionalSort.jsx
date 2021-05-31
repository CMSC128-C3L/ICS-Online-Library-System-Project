import React, { useContext } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './SearchCard.css';
import { UserContext } from '../user/UserContext';


/**
 * functional component that conditionally render sorting on result pane depending on the type of user
 */

function ConditionalIcon(props){
  const {loggedUser, setLoggedUser} = useContext(UserContext);

  return(
    <div className='sort'>
      {
        (function(userType){
          switch(userType){
            case "Admin":
              return(
                <FormControl variant="outlined">
                <InputLabel for="sort-label" style={{fontSize:'15px', lineHeight:'1vh'}}>Sort By</InputLabel>
                <Select
                  native
                  id="sort-label"
                  onChange={'temporaryHandleChange'}
                  style={{height:'5vh'}}
                  inputProps={{
                    name: 'sort',
                    id: 'outlined-sort',
                  }}>
                  <option value=""> </option>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="alphabetical order">Alphabetical Order</option>
                </Select>
              </FormControl>
              )
            default:
              return null;	
          }
        })(loggedUser.classification)
    }
    </div>
  )
	
}

export default ConditionalIcon;