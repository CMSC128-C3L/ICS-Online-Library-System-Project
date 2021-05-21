import React from 'react'
import CourseSummary from '../components/course_summary/CourseSummary'

function SummaryPage(props){
    return(
        <div>
            {/* Temporary search query 
                -- Search all books under brand "maybelline",
                    brand is treated as the course */}
            <CourseSummary query="maybelline"></CourseSummary>
        </div>
    )
}

export default SummaryPage