import React from 'react'
import CourseSummary from '../components/course_summary/CourseSummary'

function SummaryPage(props){
    return(
        <div>
            {/* Temporary search query*/}
            <CourseSummary query="CMSC 11"></CourseSummary>
        </div>
    )
}

const works = () => {
    
}

export default SummaryPage