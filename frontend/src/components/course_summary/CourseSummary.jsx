import React, { useEffect } from 'react'
import SideDescription from '../side_description/SideDescription'
import BookCard from '../search_results/BookCard'
import api from './FetchMaterials'
import './CourseSummary.css'

function CourseSummary(props){
    let [books, setBooks] = React.useState([])

    // Fetch books
    useEffect(async () => {
        const result = await api.getAllBooks()
        setBooks(result.data)
        console.log(result.data)
    }, [])

    return(
        <div className="col-center">
            
            {/* Render course code depending on inquiry
                -- For testing purposes, default is CMSC 128 */}
            <h1 className="text text-center space-0">
                {props.inquiry? props.inquiry.concat(" ","Summary") : "CMSC 128 Summary"}
            </h1>
            
            {/* Render course name depending on inquiry
                -- For testing purposes, default is Introduction to Software Engineering */}
            <h4 className="text text-center space-0">
                {props.name? props.name : "Introduction to Software Engineering"}
            </h4>
            
            <div className="row content margin-3">
                <ResultsArea>{books}</ResultsArea>
                <SideDescription/>
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