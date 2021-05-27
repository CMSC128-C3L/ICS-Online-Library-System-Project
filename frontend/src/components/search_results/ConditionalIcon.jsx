import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import DownloadIcon from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  controlIcons: {
		marginTop: '4.5em',
		marginRight: '1em',
	},
	downloadButton: {
		"&:hover": {
			color: '#95D2EC',
		}
	},
  editDelete: {
    display: 'flex',
    flexDirection: 'column',
  },
  editButton: {
    "&:hover": {
			color: '#95D2EC',
		}
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
	const history = useHistory();

  const handleEdit = (props) => {
    history.push(`/search/${props._id}`)
  }

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
                  <IconButton className={classes.editButton} onClick={(props) => handleEdit(props)} aria-label="edit">
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