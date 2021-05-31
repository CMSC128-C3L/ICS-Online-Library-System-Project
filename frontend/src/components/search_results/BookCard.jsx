import React, {useState, useRef} from 'react';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import ConditionalIcon from "./ConditionalIcon";
import './SearchCard.css'
import { useHistory } from 'react-router';
import Modal from './modal/Modal';
import DeleteDocument from './modal/DeleteDocument';

function BookCard(props) {

	/**
	 * callbacks passed to ConditionalIcon, triggered upon onClick
	 * handle edit, download, delete actions inside these functions
	 * properties of the doc such as _id can be accessed via props.doc
	 */ 	
	
	// Create reference to modal
	const deleteModal = useRef(null)
	const openDeleteModal = (user, props) => {deleteModal.current.open(user, props)}
	const history = useHistory();

	function handleDownload(){
		console.log('[BOOK] when download button clicked: ', props.doc);
	}

	function handleEdit(){
		history.push({ 
			pathname: `/search/${props.doc._id}`,
			state: { fromButtonEdit: true }
		   });

		console.log('[BOOK] when edit button clicked: ', props.doc);
	}

	function handleDelete(){
		console.log('[BOOK] when delete button clicked: ', props.doc);
		openDeleteModal();
	}

	return(
		<Card className= "doc-book-card" style={{backgroundColor: '#F4F4F4'}}>
			<CardMedia className="doc-cover" image={props.doc.book_cover_img} title={props.doc.title}/>
				<CardActionArea onClick={() => history.push(`/search/${props.doc._id}`)} >
					<Typography className="doc-title" noWrap={true} variant="h6" style={{fontWeight: '600'}}>
						{props.doc.title}
					</Typography>
				</CardActionArea>

				<div className="doc-book-content">
					<div className="doc-year-category">
						<Typography className="doc-year" variant="subtitle2">
							{props.doc.year}
						</Typography>
						<Typography className="doc-category" variant="subtitle2" style={{fontWeight: '600'}}>
							{props.doc.type.toUpperCase()}
						</Typography>
					</div>

					<div className="doc-other-details">						
						<div>							
							{/* max 3 authors shown; will wrap and no ellipsis; et al shown for the other authors */}
							<Typography gutterBottom variant="body2">
							 {props.doc.author.slice(0,4).map((author, index) => {
									return (index < 3)? 
									<span className="doc-author" key={author}>{ index ? (', ' + author) : author}</span> : 
									<span className="doc-author" key={author}>{', et al.'}</span>
								})}
							</Typography>
							<Typography gutterBottom variant="body2">
								ISBN: {props.doc.isbn}
							</Typography>
						</div>
						<div>
							<Typography noWrap gutterBottom variant="body2">
								{'Reference for: '}
								{props.doc.course_code.map((course, index) => {
									return <span className= "doc-tags" key={course} >{ index? (', ' + course) : course}</span>
								})}
							</Typography>
							<Typography noWrap gutterBottom variant="body2">
								{'Topic: '} 
								{props.doc.topic.map((topic, index) => {
									return <span className= "doc-tags" key={topic} >{ index? (', ' + topic) : topic}</span>
								})}
							</Typography>
						</div>
					</div>
					
			</div>

			<ConditionalIcon 
				className="doc-icons" 
				isBook = {true}
				handleDownload={handleDownload} 
				handleEdit={handleEdit} 
				handleDelete={handleDelete}/>
			<Modal ref={deleteModal}><DeleteDocument/></Modal>
		</Card>
	);
}


export default BookCard;