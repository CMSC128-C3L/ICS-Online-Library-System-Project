import React from 'react'
import Typography from "@material-ui/core/Typography"
import './SearchCard.css'

const handleAuthorClick = (event) => {
  console.log(event.target.value)
  /** method to navigate to author summary here */
}

const handleCourseClick = (event) => {
  console.log(event.target.value)
  /** method to navigate to course summary here */
}

function Title(props){
  return(
    <Typography className="doc-title" noWrap={true} variant="h6" style={{fontWeight: '600'}}>
      {props.title}
    </Typography>
  )
}

function Year(props){
  return(
    <Typography className="doc-year" variant="subtitle2">
			{props.year}
		</Typography>
  )
}

function Category(props){
  return(
    <Typography className="doc-category" variant="subtitle2" style={{fontWeight: '600'}}>
			{props.category.toUpperCase()}
		</Typography>
  )
}

function Isbn(props){
  return(
    <Typography gutterBottom variant="body2">
      ISBN: {props.isbn}
    </Typography>
  )
}

// max 3 authors shown; will wrap and no ellipsis; et al shown for the other authors
function AuthorList(props){
  return(
    <ul className="clickable-list">
      {props.author.slice(0,4).map((author, index) => {
        return (index < 3)? 
          <li>
            <button className="clickable-text" value={author} onClick={handleAuthorClick}>{author}</button>
          </li> :
          <li><button className="clickable-text no-hover">{'et al.'}</button></li>
      })}
    </ul>
  )
}

// max 3 courses shown; adtl will show as ellipsis
function CourseList(props){
  return(
    <div style={{display:'flex'}}>
      <Typography gutterBottom variant="body2">Reference for:&nbsp;</Typography>
        <ul className="clickable-list">
          {props.course.slice(0,4).map((course, index) => {
            return (index < 3)? 
              <li>
                <button className="clickable-text" value={course} onClick={handleCourseClick}>{course}</button>
              </li> :
              <li><button className="clickable-text no-hover">{'...'}</button></li>
          })}
        </ul>
    </div>
  )
}

function TopicList(props){
  return(
    <Typography noWrap gutterBottom variant="body2">
      Topic:&nbsp;
      {props.topic.map((topic, index) => {
        return <span className= "doc-tags" key={topic} >{ index? (', ' + topic) : topic}</span>
      })}
  </Typography>
  )
}

function AdviserList(props){
  return(
    <Typography noWrap gutterBottom variant="body2">
      Adviser:&nbsp;
      {props.adviser.slice(0,4).map((adviser, index) => {
        return (index < 3)? 
        <span key={adviser}>{ index ? (', ' + adviser) : adviser}</span> : 
        <span key={adviser}>{'...'}</span>
      })}
    </Typography>
  )
}

export {Title, Year, Category, AuthorList, Isbn, CourseList, TopicList, AdviserList}