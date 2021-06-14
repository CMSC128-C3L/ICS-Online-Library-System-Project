import React, { useRef, useEffect} from 'react'
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import ConditionalIcon from "./ConditionalIcon"
import { useHistory } from 'react-router'
import Modal from './modal/Modal'
import DeleteDocument from './modal/DeleteDocument'
import { Title, Category, CustomDate, AuthorList, AdviserList, TopicList } from './CardDetails'
import { formatDateOnly } from '../helpers/Helpers'
import './SearchCard.css'

function ThesisCard(props) {
	
	// Create reference to modal
	const deleteModal = useRef(null)
	const openDeleteModal = (user, props) => {deleteModal.current.open(user, props)}
	const history = useHistory();

  /**
	 * handle download, edit, delete actions inside these functions
	 * properties of the doc such as _id can be accessed via props.doc
	 */ 
	function handleDownload(){
		console.log('[THESIS] when download button clicked: ', props.doc);
	}

	function handleEdit(){
		console.log('[THESIS] when edit button clicked: ', props.doc);
		history.push({ 
			pathname: `/search/editDocument/${props.doc._id}`,
			state: { fromButtonEdit: true,type: "thesis"}
		});
	}

	function handleDelete(){
		console.log('[THESIS] when delete button clicked: ', props.doc);
		openDeleteModal();
	}


	return(
		<Card className= "doc-card" style={{backgroundColor: '#F4F4F4'}} title={props.doc.title}>
			<CardActionArea className="doc-title" onClick={() => history.push({pathname: `/search/${props.doc._id}`, state: { fromButtonEdit: false, type: "thesis" }})}>
				<Title title={props.doc.title} />
			</CardActionArea>

			<div className="doc-content">
				<div className="doc-year-category">
					<CustomDate date={formatDateOnly(new Date(props.doc.pub_date))} />
					<Category category={props.doc.type} />
				</div>

				<div className="doc-other-details">
					<div>
						<AuthorList author={props.doc.author} clickable={false}/>
						<AdviserList adviser={props.doc.adviser} />
						
					</div>
					<TopicList topic={props.doc.topic} />
				</div>
			</div>

			<ConditionalIcon
				className="doc-icons" 
				isBook = {false}
				handleDownload={handleDownload} 
				handleEdit={handleEdit} 
				handleDelete={handleDelete}/> 
			<Modal ref={deleteModal}><DeleteDocument thesis={props.doc} type={props.doc.type}/></Modal>
		</Card>
	);
}


export default ThesisCard;