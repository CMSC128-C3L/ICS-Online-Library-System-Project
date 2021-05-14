import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) =>({
	listContainer: {
		backgroundColor: 'transparent',
		marginTop: 10,
		marginBottom: 10,
		width: 210,
	},
	list: {
		display: 'flex',
		flexDirection: 'column',
		maxHeight: 400,
		overflow: 'auto',
	},
	listItem: {
		fontSize: 12,
		height: 'auto',
	},
	listIcon:{
		padding: 0,
		margin: 0,
	},
	listLabel: {
		margin: 0,
	},
}))

/**
* expects props listName, list, hlimit (max height for each item in list)
* returns a checklist which is re-rendered once a checkbox changes state
*/
function CheckList(props){
	const classes = useStyles();
	
	const [checked, setChecked] = useState([]);
	console.log("After re-render: ", checked);
	
	/*
	* handleCheck triggered when a checkbox is clicked, requiring a change in state
	* obtain index of checkbox item and toggle the state by including/excluding from checked list	
	*/
	const handleCheck = (item) => () => {
		const index = checked.indexOf(item);
		const newChecked = [...checked];

		// if item not in checked list, add; else, remove
		if(index === -1){
			newChecked.push(item);
		}else{
			newChecked.splice(index, 1);
		}
		
		setChecked(newChecked);
		console.log("Before re-render: ", checked);
	}
	

	return(
		<div className={classes.listContainer}>
			<Typography variant="body1">{props.listName}</Typography>
			<List dense className={classes.list}>
				{props.list.map((item) => {
					return(
						<FormControlLabel 
							key={item}
							className={classes.listItem} style={{maxHeight: props.hlimit}}
							control={
							<Checkbox
								className={classes.checkbox} 
								onChange={handleCheck(item)} 
								checked={checked.indexOf(item) !== -1}
								label={item}/>}
							label={<Typography variant="body2" color="textPrimary">{item}</Typography>}
						/>
					)
				})}
			</List>
		</div>
	);
}

export default CheckList;