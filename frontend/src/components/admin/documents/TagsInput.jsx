import React, {useState} from "react";
import {Multiselect} from 'multiselect-react-dropdown';
import './DocumentCard.css';

function TagsInput(){
    
    const data = [
        {Topics: 'Algorithms', id: 1},
        {Topics: 'Computer Vision', id: 1},
        {Topics: 'Data Structures', id: 1},
        {Topics: 'Human-Computer', id: 1},
        {Topics: 'Mobile Development', id: 1},
        {Topics: 'Web Development', id: 1}
    ]

    const [options] = useState(data);
    return (
        <div style={{display:"flex"}}>
            <div>
                <h3>ADD A TAG</h3>
                <Multiselect options={options} displayValue="Topics"/>
            </div>
          
        </div>
    );
};

export default TagsInput;