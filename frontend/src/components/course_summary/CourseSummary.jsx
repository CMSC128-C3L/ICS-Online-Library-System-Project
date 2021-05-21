import React, { useEffect } from 'react'
import './CourseSummary.css'
import SideDescription from '../side_description/SideDescription'
import BookCard from '../search_results/BookCard'
import api from './FetchMaterials'

function CourseSummary(props){
    let [books, setBooks] = React.useState([])

    useEffect(async () => {
        const result = await api.getAllBooks()
        setBooks(result.data)
        console.log(result.data)
    }, [])

    return(
        <div className="col-center">
            <h1 className="text text-center space-0">
                {props.inquiry? props.inquiry.concat(" ","Summary") : "CMSC 128 Summary"}
            </h1>
            
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