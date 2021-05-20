import React from 'react'
import './SideDescription.css'

const sampleDescription = {
    prerequisites : ["CMSC 173"],
    description: "Principles and methods for the design, implementation, validation, evaluation and maintenance of software systems."
}

function SideDescription(props){
    return(
        <div className="sidecard flex-left text margin-bot-1">
            <div className="margin-bot-1">
                <h4 className="desc-header space-0">Prerequisities</h4>
                <ul className="list space-0">
                    <li>CMSC 100</li>
                    <li>CMSC 123</li>
                </ul>
            </div>

            <div>
                <h4 className="desc-header space-0">Description</h4>
                <p className="space-0">
                    Principles and methods for the design, implementation, validation, evaluation and maintenance of software systems.
                </p>
            </div>
        </div>
    )
}

export default SideDescription