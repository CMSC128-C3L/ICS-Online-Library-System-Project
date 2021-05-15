import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';

const courses = ["CMSC 12", "CMSC 21", "CMSC 22", "CMSC 23", "CMSC 56", "CMSC 57", "CMSC 100", "CMSC 123", "CMSC 124",
 "CMSC 125", "CMSC 127", "CMSC 128", "CMSC 129", "CMSC 130", "CMSC 131", "CMSC 132", "CMSC 137", "CMSC 141", "CMSC 142", 
 "CMSC 150", "CMSC 161", "CMSC 165", "CMSC 170", "CMSC 172", "CMSC 173", "CMSC 180"];

const useStyles = makeStyles((theme) => ({
	dropdownContainer: {
		marginTop: 10,
		marginBottom: 30,
	},
	formControl: {
		height: 40,
    	minWidth: 150,
	},
	dropdownLabel: {
		margin: 0,
	},
	inputLabel: {
		fontSize: 14,
	},
	options: {
		fontSize: 14,
	}
}));

/**
* no props expected
*	returns a dropdown menu which is re-rendered once selected course code changes
*/
function ReferenceDropdown(){
	const classes = useStyles()

	const [selected, setSelected] = useState('');
	
	const handleSelect = (event) => {
    setSelected(event.target.value);
  };

	return(
    	<div className={classes.dropdownContainer}>
			<Typography variant="body1">Reference for</Typography>
				<FormControl className={classes.formControl}>
				<InputLabel className={classes.inputLabel}>Course Code</InputLabel>
				<Select 
					native
					value={selected}
					label="Course Code"
					onChange={handleSelect}>
					<option aria-label="None" value="" />
					{courses.map((course) => {
						return(<option className={classes.options} value={course} key={course}>{course}</option>);
					})}
				</Select>
			</FormControl>
		</div>
	);
}

export default ReferenceDropdown;