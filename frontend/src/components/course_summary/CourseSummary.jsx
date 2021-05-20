import React from 'react'
import './CourseSummary.css'
import SideDescription from '../side_description/SideDescription'

function CourseSummary(props){
    return(
            <div className="col-center">
                <h1 className="text space-bot-0">{props.inquiry? props.inquiry.concat(" ","Summary") : "CMSC 128 Summary"}</h1>
                <h4 className="text margin-top-0">{props.name? props.name : "Introduction to Software Engineering"}</h4>
                <div>
                    <SideDescription></SideDescription>
                </div>
            </div>
    )
}

export default CourseSummary