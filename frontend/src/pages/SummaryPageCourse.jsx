import React from 'react'
import CourseSummary from '../components/course_summary/CourseSummary'
import '../components/author_summary/AuthorSummary.css'
function SummaryPageCourse(props){
    return(
        <div className="bg-summary">
            {/* Temporary search query*/}
            <CourseSummary></CourseSummary>
        </div>
    )
}

export default SummaryPageCourse