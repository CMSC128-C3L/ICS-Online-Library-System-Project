import React from 'react'
import AuthorSummary from '../components/author_summary/AuthorSummary'
import '../components/author_summary/AuthorSummary.css'
function SummaryPageAuthor(props){
    return(
        <div className="bg-summary">
            {/* Temporary search query*/}
            <AuthorSummary></AuthorSummary>
        </div>
    )
}

const works = () => {
    
}

export default SummaryPageAuthor