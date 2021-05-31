import React, { useRef} from 'react';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import ConditionalIcon from "./ConditionalIcon";
import { useHistory } from 'react-router';
import './SearchCard.css';
import Modal from './modal/Modal';
import DeleteDocument from './modal/DeleteDocument';

function JournalCard(props) {

	/**
	 * callbacks passed to ConditionalIcon, triggered upon onClick
	 * handle download, edit, delete actions inside these functions
	 * properties of the doc such as _id can be accessed via props.doc
	 */ 
	 const deleteModal = useRef(null)
	 const openDeleteModal = (user, props) => {deleteModal.current.open(user, props)}
	 const history = useHistory();

	function handleDownload(){
		console.log('[JOURNAL] when download button clicked: ', props.doc);
	}

	function handleEdit(){
		console.log('[JOURNAL] when edit button clicked: ', props.doc);
		history.push({ 
			pathname: `/search/${props.doc._id}`,
			state: { fromButtonEdit: true }
		   });
	}

	function handleDelete(){
		console.log('[JOURNAL] when delete button clicked: ', props.doc);
		openDeleteModal();
	}

	return(
		<Card className= "doc-card" style={{backgroundColor: '#F4F4F4'}}>
			<CardActionArea onClick={() => history.push(`/search/${props.doc._id}`)}>
				<Typography className="doc-title" noWrap={true} variant="h6" style={{fontWeight: '600'}}>
					{props.doc.title}
				</Typography>
			</CardActionArea>
			<div className="doc-content">

				<div className="doc-year-category">
					<Typography className="doc-category" variant="subtitle2" style={{fontWeight: '600'}}>
						JOURNAL
					</Typography>
				</div>

					<div className="doc-other-details">
						<div>
							<Typography gutterBottom variant="body2">
							 {props.doc.author.slice(0,4).map((author, index) => {
									return (index < 3)? 
									<span className="doc-author" key={author}>{ index ? (', ' + author) : author}</span> : 
									<span className="doc-author" key={author}>{', et al.'}</span>
								})}
							</Typography>
							<Typography gutterBottom variant="body2">
								{'Adviser: '} 
								{props.doc.adviser.slice(0,4).map((author, index) => {
									return (index < 3)? 
									<span key={author}>{ index ? (', ' + author) : author}</span> : 
									<span key={author}>{'...'}</span>
								})}
							</Typography>
						</div>
						<div>
							{/* <Typography noWrap gutterBottom variant="body2">
								{'Publication Date: ' + props.doc.pub_date}
							</Typography> */}
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
				isBook = {false}
				handleDownload={handleDownload} 
				handleEdit={handleEdit} 
				handleDelete={handleDelete}/>
				<Modal ref={deleteModal}><DeleteDocument/></Modal>
		</Card>
	);
}


export default JournalCard;