import React from 'react'
import Typography from "@material-ui/core/Typography"
import './SearchCard.css'
import {useHistory} from 'react-router'


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
  const history = useHistory();
  const handleAuthorClick = (event) => {
     history.push('/authorSummary/' + event.target.value);
  }

  if (props.clickable){
    return(
      <ul className="clickable-list">
        {props.author.slice(0,4).map((author, index) => {
          return (index < 3)? 
            <li key={author}>
              <button className="clickable-text" value={author} onClick={handleAuthorClick}>{author}</button>
            </li> :
            <li key={author}><button className="clickable-text no-hover">{'et al.'}</button></li>
        })}
      </ul>
    )
  }else {
    return(
      <Typography noWrap gutterBottom variant="body2">
        {props.author.slice(0,4).map((author, index) => {
          return (index < 3)? 
          <span key={author}>{ index ? (', ' + author) : author}</span> : 
          <span key={author}>{'et al.'}</span>
        })}
      </Typography>
    )
  }
}

// max 3 courses shown; adtl will show as ellipsis
function CourseList(props){
  const history = useHistory();
  const handleCourseClick = (event) => {
    history.push('/courseSummary/' + event.target.value);
  }
  return(
    <div style={{display:'flex'}}>
      <Typography gutterBottom variant="body2">Reference for:&nbsp;</Typography>
      <ul className="clickable-list">
        {props.course.slice(0,4).map((course, index) => {
          return (index < 3)? 
            <li key={course}>
              <button className="clickable-text" value={course} onClick={handleCourseClick}>{course}</button>
            </li> :
            <li key={course}><button className="clickable-text no-hover">{'...'}</button></li>
        })}
      </ul>
    </div>
  )
}

// max 3 courses shown; adtl will show as ellipsis
function CourseListUpdate(props){
  const history = useHistory();
  const handleCourseClick = (event) => {
    history.push('/courseSummary/' + event.target.value);
  }
  return(
    <div style={{display:'flex'}}>
      <Typography gutterBottom variant="body2">Reference for:&nbsp;</Typography>
      <ul className="clickable-list">
        {props.course.slice(0,4).map((course, index) => {
          return (index < 3)? 
            <li key={course.code}>
              <button className="clickable-text" value={course.code} onClick={handleCourseClick}>{course.code}</button>
            </li> :
            <li key={course}><button className="clickable-text no-hover">{'...'}</button></li>
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
   const history = useHistory();

  const handleAdviserClick = (event) => {
    console.log(event.target.value)
    history.push('/adviserSummary/' + event.target.value);
    /** method to navigate to author summary here
     *  may be removed and absorbed in author click if method is the same
     */
  }

  return(
    <div style={{display:'flex'}}>
      <Typography gutterBottom variant="body2">Adviser:&nbsp;</Typography>
      <ul className="clickable-list">
        {props.adviser.slice(0,4).map((adviser, index) => {
          return (index < 3)? 
            <li key={adviser}>
              <button className="clickable-text" value={adviser} onClick={handleAdviserClick}>{adviser}</button>
            </li> :
            <li key={adviser}><button className="clickable-text no-hover">{'...'}</button></li>
        })}
      </ul>
    </div>
  )
}

export {Title, Year, Category, AuthorList, Isbn, CourseList, CourseListUpdate, TopicList, AdviserList}