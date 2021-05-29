import React, {useState} from "react";
import {Multiselect} from 'multiselect-react-dropdown';
import './DocumentCard.css';

function TagsInput(){
    
    const data = [
        {Topic: "Analysis of Algorithms", id: 1},
        {Topic: "Automata and Language Theory", id: 2},
        {Topic: "Compiler Design", id: 3},
        {Topic: "Computer Architecture", id: 4},
        {Topic: "Computer Graphics", id: 5},
        {Topic: "Data Communications and Networking", id: 6},
        {Topic: "Data Structures", id: 7},
        {Topic: "Discrete Mathematics", id: 8},
        {Topic: "Database Systems", id: 9},
        {Topic: "Fundamentals of Programming", id: 10},
        {Topic: "Internet", id: 11},
        {Topic: "Logic Design and Digital Circuits", id: 12},
        {Topic: "Machine-Level Programming", id: 13},
        {Topic: "Numerical and Symbolic Computation", id: 14},
        {Topic: "Object-Oriented Programming", id: 15},
        {Topic: "Operating Systems", id: 16},
        {Topic: "Parallel Computing", id: 17},
        {Topic: "Personal Computing", id: 18},
        {Topic: "Robot Modeling", id: 19},
        {Topic: "Software Engineering", id: 20},
        {Topic: "Programming Languages", id: 21},
        {Topic: "Web Programming", id: 22}
    ]

    const [options] = useState(data);
    return (
        <div style={{display:"flex"}}>
            <div>
                <h3>ADD A TAG</h3>
                <Multiselect 
                options={options} 
                displayValue="Topic"
                />
            </div>
          
        </div>
    );
};

export default TagsInput;