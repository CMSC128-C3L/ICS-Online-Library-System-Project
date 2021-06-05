import React, { useState, useEffect } from 'react'
import SideDescription from '../side_description/SideDescription'
import BookResult from './BookCard'
import api from './FetchMaterials'
import './CourseSummary.css'

function CourseSummary(props){
    
    // Temporary values for code, name, description, prerequisites while no api
    let [summary, setSummary] = useState({
        code:'CMSC 128',
        name:'Introduction to Software Engineering',
        description:'Principles and methods for the design, implementation, validation, evaluation and maintenance of software systems.',
        prerequisites:['CMSC 100', 'CMSC 123'],
        books: [],
    })

    useEffect(() => {
        
        // Fetch books with course == props.query
        async function fetchSummary(){
            api.getBooks(props.query).then((books) => {
                console.log(books.data)
                setSummary(prevSummary=>({
                    ...prevSummary,
                    // name: course.name,
                    // description: course.description,
                    // prerequisites: course.prerequisites
                    books: books.data
                }))
            })
            // const course = await api.getCourse(props.query)
        }

        fetchSummary()
    }, [props.query])


    return(
        <div className="col-center">

            <div>
                {/* Render course code depending on inquiry*/}
                <h1 className="text title-case text-center space-0">{summary.code}</h1>

                {/* Render course name depending on inquiry*/}
                <h4 className="text text-center space-0">{summary.name}</h4>
            </div>
            
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
                    return <BookResult
                        key={i}
                        isbn={book.isbn}
                        title={book.title}
                        author={book.author}
                        book_cover_img={book.book_cover_img}
                        year={book.year}
                        topic={book.topic}
                    />
                })
            }
        </div>
    )
}

export default CourseSummary