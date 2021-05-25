import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import DownloadIcon from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  controlIcons: {
		marginTop: '4.5em',
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

const handleDownload = (event) => {
  /**
   * do nothing for now
   */
}

const handleEdit = (event) => {
  /**
   * do nothing for now
   */
}

const handleDelete = (event) => {
  /**
   * do nothing for now
   */
}

/**
 * functional component with an IIFE inside
 * conditionally render icons on cards depending on the type of user
 */

function ConditionalIcon(props){
  const classes = useStyles();
  return(
    <div className={classes.controlIcons}>
      {
        (function(userType){
          switch(userType){
            case "Faculty":
            case "Staff":
              return(
                <IconButton className={classes.downloadButton} onClick={handleDownload} aria-label="download">
                  <DownloadIcon fontSize="large"/>
                </IconButton>
              )
            case "Admin":
              return(
                <div className={classes.editDelete}>
                  <IconButton className={classes.editButton} onClick={handleEdit} aria-label="edit">
                    <EditIcon fontSize="large"/>
                  </IconButton>
                  <IconButton className={classes.deleteButton} onClick={handleDelete} aria-label="delete">
                    <DeleteIcon fontSize="large"/>
                  </IconButton>
                </div>
              )
            default:
              return null;	
          }
        })(props.userType)
      }
    </div>
  )
	
}

export default ConditionalIcon;