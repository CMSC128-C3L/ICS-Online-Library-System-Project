import React, {useState, useRef} from 'react'
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardMedia from "@material-ui/core/CardMedia"
import ConditionalIcon from "./ConditionalIcon"
import { useHistory } from 'react-router'
import Modal from './modal/Modal'
import DeleteDocument from './modal/DeleteDocument'
import { Title, CustomDate, Category, AuthorList, Isbn, CourseList, TopicList } from './CardDetails'
import './SearchCard.css'

function BookCard(props) { 	
	
	// Create reference to modal
	const deleteModal = useRef(null)
	const openDeleteModal = (user, props) => {deleteModal.current.open(user, props)}
	const history = useHistory();

  /**
	 * handle edit, download, delete actions inside these functions
	 * properties of the doc such as _id can be accessed via props.doc
	 */
	function handleEdit(){
		history.push({ 
			pathname: `/search/editDocument/${props.doc._id}`,
			state: { fromButtonEdit: true, type: "book" }
		   });

	}

	function handleDelete(){

		openDeleteModal();
	}

	return(
		<Card className= "doc-book-card" style={{backgroundColor: '#F4F4F4'}} title={props.doc.title}>
			<CardMedia className="doc-cover" image={props.doc.book_cover_img}/>
				<CardActionArea className="doc-title" onClick={() => history.push({pathname: `/search/${props.doc._id}`, state: { fromButtonEdit: false, type: "book" }})}>
					<Title title={props.doc.title} />
				</CardActionArea>
			
				<div className="doc-book-content">
					<div className="doc-year-category">
						<CustomDate date={props.doc.year} />
            <Category category={props.doc.type} />
					</div>

					<div className="doc-other-details">						
						<div>							
              <AuthorList author={props.doc.author} clickable={true}/>
              <Isbn isbn={props.doc.isbn} />
						</div>
						<div>
              <CourseList course={props.doc.course_code} />
              <TopicList topic={props.doc.topic} />
						</div>
					</div>					
			  </div>

			<ConditionalIcon 
				className="doc-icons" 
				isBook = {true}
				handleEdit={handleEdit} 
				handleDelete={handleDelete}/>
			<Modal ref={deleteModal}><DeleteDocument book={props.doc} type={props.doc.type}/></Modal>
		</Card>
	);
}


export default BookCard;
