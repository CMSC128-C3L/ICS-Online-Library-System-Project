import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CategoryChecklist from './CategoryChecklist';
import TopicChecklist from './TopicChecklist';
import Typography from '@material-ui/core/Typography';
import ReferenceDropdown from './ReferenceDropdown'
import { ACTIONS } from '../../pages/SearchPage';

const category = {
	'name': 'Category', 
	'list': [
	"Books", 
	"Journals", 
	"Special Problems", 
	"Theses"]};
const topic = {
	'name': 'Topic', 
	'list': [
  "Algorithms",
  "Android Development",
  "Computer Architecture",
  "Computer Graphics",
  "Data Structures",
  "Database Management",
  "Human-Computer Interaction",
  "Parallel Algorithms",
  "Web Development",
  "Artificial Intelligence",
  "Discrete Mathematics",
  "Machine Learning",
  "Robotics",
  "Networking",
  "Computer Security",
  "Cryptography",
  "Operating System",
  "Image Processing",
  "Distributed Computing",
  "Automata",
  "Software Engineering",
  "Special Topic",
  "Programming Languages",
]};

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
			<CategoryChecklist list={category.list} action={ACTIONS.updateCategory} hlimit={30}/>
			<ReferenceDropdown action={ACTIONS.updateCourseCode} />
			<TopicChecklist list={topic.list} action={ACTIONS.updateTopic} hlimit={'none'}/>
		</div>
	);
}

export default FilterSideBar;