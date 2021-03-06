import React, { useContext } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import DownloadIcon from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import decode from 'jwt-decode';


const useStyles = makeStyles((theme) => ({
  controlIcons: {
		marginTop: '1.5em',
	},
	downloadButton: {
		"&:hover": {
			color: '#95D2EC',
		}
	},
  editButton: {
    "&:hover": {
			color: '#95D2EC',
		},
    marginBottom: '5px',
  },
  deleteButton:{
    "&:hover": {
			color: '#E57373',
		}
  }
}));

/**
 * functional component with an IIFE inside
 * conditionally render icons on cards depending on the type of user
 * onClick triggers the handler from parent card component
 */

function ConditionalIcon(props){
  const classes = useStyles();
  const data = (localStorage.length != 0) ? decode(localStorage.getItem('token')) : '{}';

  return(
    <div className={classes.controlIcons}>
      {
        (function(userType){
          switch(userType){
            case "Admin":
              return(
                <div className={classes.editDelete}>
                  <IconButton className={classes.editButton} onClick={props.handleEdit} aria-label="edit">
                    <EditIcon fontSize="large"/>
                  </IconButton>
                  <IconButton className={classes.deleteButton} onClick={props.handleDelete} aria-label="delete">
                    <DeleteIcon fontSize="large"/>
                  </IconButton>
                </div>
              )
            default:
              return null;	
          }
        })(data.classification)
    }
    </div>
  )
	
}

export default ConditionalIcon;