import React from 'react';
import CategoryChecklist from './CategoryChecklist';
import TopicChecklist from './TopicChecklist';
import Typography from '@material-ui/core/Typography';
import ReferenceDropdown from './ReferenceDropdown'
import { ACTIONS } from '../../pages/SearchPage';
import './Filter.css'

// Contains three major components: the Category CheckList, Reference Dropdown, Topic Checkbox List
function FilterSideBar(){

	return(
		<div className="filter-bar-container">
			<Typography className="filter-header" variant="h6">Filter Results</Typography>
			<CategoryChecklist list={category.list} action={ACTIONS.updateCategory} hlimit={30}/>
			<ReferenceDropdown action={ACTIONS.updateCourseCode} />
			<TopicChecklist list={topic.list} action={ACTIONS.updateTopic} hlimit={'none'}/>
		</div>
	);
}

const category = {'name': 'Category', 'list': ["Books", "Special Problems", "Theses"]};
const topic = {
	'name': 'Topic', 
	'list': [
    'Algorithms',
    'Android Development',
    'Artificial Intelligence',
    'Automata',
    'Bioinformatics',
    'Computer Architecture',
    'Computer Graphics',
    'Computer Security',
    'Cryptography',
    'Data Structures',
    'Database Management',
    'Discrete Mathematics',
    'Distributed Computing',
    'Human-Computer Interaction',
    'Image Processing',
    'Machine Learning',
    'Networking',
    'Operating System',
    'Parallel Algorithms',
    'Programming Languages',
    'Robotics',
    'Security',
    'Software Engineering',
    'Special Topic',
    'Speech Recognition',
    'User Interface',
    'Web Development',
  ]
};


export default FilterSideBar;