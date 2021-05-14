import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CheckList from './CheckList';
import Typography from '@material-ui/core/Typography';
import ReferenceDropdown from './ReferenceDropdown'

const category = {'name': 'Category', 'list': ["Books", "Journals", "Special Problems", "Theses"]};
const topic = {
	'name': 'Topic', 
	'list': ["Analysis of Algorithms", "Automata and Language Theory", "Compiler Design", "Computer Architecture", "Computer Graphics", 
	"Data Communications and Networking", "Data Structures", "Discrete Mathematics", "Database Systems", "Fundamentals of Programming",
	"Internet", "Logic Design and Digital Circuits", "Machine-Level Programming", "Numerical and Symbolic Computation", 
	"Object-Oriented Programming", "Operating Systems", "Parallel Computing", "Personal Computing", "Robot Modeling",
	"Software Engineering", "Programming Languages", "Web Programming"]
};

const useStyles = makeStyles((theme) => ({
	filterContainer: {
		backgroundColor: '#F8F8F8',
		width: 210,
		padding: 10,
		paddingLeft: 20,
	},
	filterText: {
		margin:0,
	}
}));

/*
contains three major components: the Category CheckList, Reference Dropdown, Topic Checkbox List
*/
function FilterSideBar(){
	const classes = useStyles();

	return(
		<div className={classes.filterContainer}>
			<Typography variant="h6">Filter Results</Typography>
			<CheckList listName={category.name} list={category.list} hlimit={30}/>
			<ReferenceDropdown />
			<CheckList listName={topic.name} list={topic.list} hlimit={'none'}/>
		</div>
	);
}

export default FilterSideBar;