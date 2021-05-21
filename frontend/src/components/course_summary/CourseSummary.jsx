import React, { useState, useEffect } from 'react'
import SideDescription from '../side_description/SideDescription'
import BookCard from '../search_results/BookCard'
import api from './FetchMaterials'
import './CourseSummary.css'

function CourseSummary(props){
    
    // Temporary values for code, name, description, prerequisites
    let [summary, setSummary] = useState({
        code:'CMSC 128',
        name:'Introduction to Software Engineering',
        description:'Principles and methods for the design, implementation, validation, evaluation and maintenance of software systems.',
        prerequisites:['CMSC 100', 'CMSC 123'],
        books: [],
    })

    useEffect(() => {
        
        // Fetch books with course == props.query
        // Temporarily, course = brand of makeup api
        async function fetchSummary(){
            const books = await api.getAllBooks(props.query)
            
            setSummary(prevSummary=>({
                ...prevSummary,
                books: books.data
            }))
        }

        fetchSummary()
    }, [props.query])


    return(
        <div className="col-center">

            {/* Render course code depending on inquiry
                -- For testing purposes, default is CMSC 128 */}
            <h1 className="text title-case text-center space-0">{summary.code}</h1>
            
            {/* Render course name depending on inquiry
                -- For testing purposes, default is Introduction to Software Engineering
                -- TODO: Query course details */}
            <h4 className="text text-center space-0">{summary.name}</h4>
            
            <div className="row content margin-3">
                <ResultsArea>{summary.books}</ResultsArea>
                <SideDescription description={summary.description}>{summary.prerequisites}</SideDescription>
            </div>
        </div>
    )
}

function ResultsArea(props){
    return(
        <div className="results-container">
            {
                props.children.map((book, i)=>{
                    return <TemporaryBookCard
                        key={book.id}
                        isbn={book.isbn}
                        title={book.title}
                        author={book.author}
                        book_cover_img={book.book_cover_img}
                        year={book.year}
                    />
                })
            }
        </div>
    )
}

// Temporary book card to show results
function TemporaryBookCard(props){
    return(
        <div className="wrap">
            <div className="desc">
                <img src={props.book_cover_img} className="small" alt="book"/>
                <h2>{props.title}</h2>
                <h3>{props.author}</h3>
                <p>{props.publisher}</p>
                <p>{props.isbn}</p>
                <p>{props.year}</p>
                <p>{props.publisher}</p>
                <p>{props.view_count}</p>
                <p>{props.download_count}</p>
                <p>{props.description}</p>
                <p>{props.subject}</p>
                <p>{props.topic}</p>
            </div>
            
        </div>
    )
}

export default CourseSummary