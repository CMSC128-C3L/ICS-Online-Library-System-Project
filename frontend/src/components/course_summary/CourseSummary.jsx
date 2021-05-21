import React from 'react'
import './CourseSummary.css'
import SideDescription from '../side_description/SideDescription'
import BookList from '../search_results/BookList'
import api from './FetchMaterials'

function CourseSummary(props){
    let [resBooks, setResBooks] = React.useState([])

    const fetchBooks = (e) => {
        e.preventDefault()

        // set fetched books to resBooks state
        api.getAllBooks()
        .then((response) => {
            setResBooks(response.data)
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return(
        <div className="col-center">
            <h1 className="text text-center space-0">
                {props.inquiry? props.inquiry.concat(" ","Summary") : "CMSC 128 Summary"}
            </h1>
            
            {/* Temporary button to start fetching data */}
            <button onClick={(e) => fetchBooks(e)} type='button'>Click Me For Data</button>
            
            <h4 className="text text-center space-0">
                {props.name? props.name : "Introduction to Software Engineering"}
            </h4>
            
            <div className="row content margin-3">
                <ResultsArea></ResultsArea>
                <SideDescription/>
            </div>
        </div>
    )
}

function ResultsArea(props){
    return(
        <div className="results-container">
            
        </div>
    )
}

export default CourseSummary