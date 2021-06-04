import React, {useState} from "react";
import {Multiselect} from 'multiselect-react-dropdown';
import './DocumentCard.css';

function TagsInput(){
    
    const data = [
        {Topic: 'Algorithms', id: 1},
        {Topic: 'Android Development', id: 2},
        {Topic: 'Artificial Intelligence', id: 3},
        {Topic: 'Automata', id: 4},
        {Topic: 'Bioinformatics', id: 5},
        {Topic: 'Computer Architecture', id: 6},
        {Topic: 'Computer Graphics', id: 7},
        {Topic: 'Computer Security', id: 8},
        {Topic: 'Cryptography', id: 9},
        {Topic: 'Data Structures', id: 10},
        {Topic: 'Database Management', id: 11},
        {Topic: 'Discrete Mathematics', id: 12},
        {Topic: 'Distributed Computing', id: 13},
        {Topic: 'Human-Computer Interaction', id: 14},
        {Topic: 'Image Processing', id: 15},
        {Topic: 'Machine Learning', id: 16},
        {Topic: 'Networking', id: 17},
        {Topic: 'Operating System', id: 18},
        {Topic: 'Parallel Algorithms', id: 19},
        {Topic: 'Programming Languages', id: 20},
        {Topic: 'Robotics', id: 21},
        {Topic: 'Security', id: 22},
        {Topic: 'Software Engineering', id: 23},
        {Topic: 'Special Topic', id: 24},
        {Topic: 'Speech Recognition', id: 25},
        {Topic: 'User Interface', id: 26},
        {Topic: 'Web Development', id: 27}
    ]

    const [options] = useState(data);
    return (
        <div style={{display:"flex"}}>
            <div>
                <div className="main-text-tags">Add a Tag:</div>
                <Multiselect 
                options={options} 
                displayValue="Topic"
                />
            </div>
          
        </div>
    );
};

export default TagsInput;