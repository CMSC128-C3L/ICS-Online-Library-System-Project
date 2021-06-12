import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import SearchContext from '../search_results/SearchContext';
import updateQueryString from '../search_results/UpdateQueryString';
import './Filter.css'

/**
* no props expected
*	returns a dropdown menu which is re-rendered once selected course code changes
*/
function ReferenceDropdown(props){

	const searchContext = useContext(SearchContext);
	const handleChange = (event) =>{
		searchContext.dispatch({type: props.action, item: event.target.value})	
		updateQueryString(searchContext);
	}
	
	return(
		<div className="filter-dropdown-container">
		<Typography variant="body1">Reference for</Typography>
			<FormControl className="filter-dropdown">
			<InputLabel className="filter-input-label">Course Code</InputLabel>
			<Select 
				native
				value={searchContext.state.courseCode}
				label="Course Code"
				onChange={
					(event) => handleChange(event)}>
				<option aria-label="None" value="" />
				{courses.map((course) => {
					return(<option className="filter-dropdown-options" value={course} key={course}>{course}</option>);
				})}
			</Select>
			</FormControl>
		</div>
	);
}


const courses = [
	'CMSC 1',		'CMSC 2 ',	'CMSC 11',
	'CMSC 12',	'CMSC 21',	'CMSC 22',
	'CMSC 23',	'CMSC 55',	'CMSC 56',
	'CMSC 57',	'CMSC 100',	'CMSC 123',
	'CMSC 124', 'CMSC 125',	'CMSC 127',
	'CMSC 128', 'CMSC 129',	'CMSC 130',
	'CMSC 131', 'CMSC 132', 'CMSC 137',
	'CMSC 140', 'CMSC 141', 'CMSC 142',
	'CMSC 150', 'CMSC 161', 'CMSC 165',
	'CMSC 170', 'CMSC 172', 'CMSC 173',
	'CMSC 180', 'CMSC 190', 'CMSC 191',
	'CMSC 198', 'CMSC 199', 'CMSC 200',
	'CMSC 214', 'CMSC 215',	'CMSC 220',
	'CMSC 221',	'CMSC 222',	'CMSC 224',
	'CMSC 225',	'CMSC 227',	'CMSC 228',
	'CMSC 229',	'CMSC 231',	'CMSC 241',
	'CMSC 242',	'CMSC 243',	'CMSC 244',
	'CMSC 245',	'CMSC 250',	'CMSC 265',
	'CMSC 271',	'CMSC 272',	'CMSC 280',
	'CMSC 290',	'CMSC 291',	'CMSC 299',
	'CMSC 300',	'CMSC 341',	'CMSC 342',
	'CMSC 391',	'CMSC 399',	'CMSC 400',
]

export default ReferenceDropdown;