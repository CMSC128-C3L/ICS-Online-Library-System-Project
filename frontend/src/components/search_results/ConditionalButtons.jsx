import React, { useContext, useRef } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from '../user/UserContext';

import './SearchCard.css';
import Modal from './modal/Modal';
import AddDocument from './modal/AddDocument';
import { useHistory } from 'react-router';

const useStyles = makeStyles(()=> ({
  iconStyle:{
    '&:hover': {
      color: "#95D2EC",
   },
  color:'black', 
  width:'4vh', 
  height:'4vh'
  }
}));

/**
 * functional component that conditionally render buttons on cards depending on the type of user
 */

function ConditionalButtons(props){
  const classes = useStyles();
  const {loggedUser, setLoggedUser} = useContext(UserContext);
  const history = useHistory();

  // Create reference to modal
	const addModal = useRef(null)
	const openAddModal = (user, props) => {addModal.current.open(user, props)}

  const handleAdd = () =>{
		openAddModal();
  }

  return(
    <div>
      {
        (function(userType){
          switch(userType){
            case "Admin":
              return(
                <div>
                  <button className="tool-button" onClick={"temporaryOnclick"}> MULTIPLE SELECT </button>
                </div>
              )
            default:
              return null;	
          }
        })(loggedUser.classification)
    }
    <Modal ref={addModal}><AddDocument/></Modal>
    </div>
  )
	
}

export default ConditionalButtons;