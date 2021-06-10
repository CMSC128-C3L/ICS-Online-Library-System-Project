import React from 'react'
import './CourseSummary.css'

function BookResult(props){
    return(
        <div className="row book-card">
            {/*1: Image (if book, render image; if not, render nothing) */}
            {props.category === "Book" ?  (<div className="image-container">
                <img src={props.book_cover_img} className="book-image" alt="book"/>
            </div>) : <></>}
           
            {/* 2: Details */}
            <div className="col text details">
                
                {/* 2a: Title, Year, Category */}
                <div>
                    <h5 className="book-title">{props.title}</h5>
                    <br />
                    <div>
                        <span className="year">{props.year}</span>
                        <span className="category">{props.category}</span>
                    </div>
                </div>

                {/* 2b: Author, ISBN */}
                <div>
                    <p className="author">{props.author.join(', ')}</p>
                    <p>{props.isbn}</p>
                </div>

                {/* 2c: Tags */}
                <div className="tags row">{
                    props.topic.map((topic, i)=> {
                        return(
                            <span className="topic" key={i}>{topic}</span>
                        )
                    })
                }</div>
            </div>
            
            
            <div className="download">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16 11h5l-9 10-9-10h5v-11h8v11zm1 11h-10v2h10v-2z"/></svg>
            </div>
            
        </div>
    )
}

export default BookResult