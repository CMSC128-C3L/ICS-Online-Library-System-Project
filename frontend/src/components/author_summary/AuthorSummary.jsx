import React, { useState, useEffect } from 'react'
import SideDescription from '../side_description/SideDescriptionAuthor'
import BookResult from '../course_summary/BookCard'
import api from '../course_summary/FetchMaterials'
import './AuthorSummary.css'

function AuthorSummary(props){
    
    // Temporary values for code, name, description, prerequisites while no api
    let [summary, setSummary] = useState({
        name:'FirstName LastName',
        title:'Institute of Computer Science',
        interests:['Data Science', 'Algorithms'],
        info:'Insert info here',
        books: [],
    })

    useEffect(() => {
        
        // Fetch books with course == props.query
        async function fetchSummary(){
            const books = await api.getBooks(props.query)
            // const course = await api.getCourse(props.query)

            console.log(books.data)
            setSummary(prevSummary=>({
                ...prevSummary,
                // name: course.name,
                // description: course.description,
                // prerequisites: course.prerequisites
                books: books.data
            }))
        }

        fetchSummary()
    }, [props.query])


    return(
        <div className="col-center">

            <div className="col-center">
                {/* Render course code depending on inquiry*/}
                {/* Placeholder profile image */}
                <img className="pfp" src="https://www.w3schools.com/howto/img_avatar.png"/>
                <h1 className="text title-case text-center space-0">{summary.name}</h1>

                {/* Render course name depending on inquiry*/}
                <h4 className="text text-center space-0">{summary.title}</h4>
            </div>
            
            <div className="row content margin-3">
                <ResultsArea>{summary.books}</ResultsArea>
                <SideDescription description={summary.info}>{summary.interests}</SideDescription>
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
                    />
                })
            }
        </div>
    )
}

export default AuthorSummary