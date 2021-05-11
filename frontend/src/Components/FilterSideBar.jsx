import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CheckboxList from './CheckboxList';
import ReferenceDropdown from './ReferenceDropdown'

const category = {'name': 'Category', 'list': ["Books", "Journals", "Special Problems", "Theses"]};
const topic = {
	'name': 'Topic', 
	'list': ["Algorithms", "Android Development", "Computer Architecture", "Computer Graphics", "Data Structures", 
	"Database Management", "Human-Computer Interaction", "Parallel Algorithms", "Web Development"]
};

const useStyles = makeStyles((theme) => ({
	filterContainer: {
		backgroundColor: '#F8F8F8',
		height: 'calc(100% - 150px)',
		width: 210,
		padding: 10,
		paddingLeft: 20,
	},
	filterText: {
		margin:0,
	}
}));

/*
contains three major components: the Category Checkbox List, Reference Dropdown, Topic Checkbox List
*/
function FilterSideBar(){
	const classes = useStyles();

	return(
		<div className={classes.filterContainer}>
			<h3 className={classes.filterText}>Filter Results</h3>
			<CheckboxList listName={category.name} list={category.list}/>
			<ReferenceDropdown />
			<CheckboxList listName={topic.name} list={topic.list}/>
		</div>
	);
}

export default FilterSideBar;