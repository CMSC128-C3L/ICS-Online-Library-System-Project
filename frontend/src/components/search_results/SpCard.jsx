import React, { useRef} from 'react'
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import ConditionalIcon from "./ConditionalIcon"
import { useHistory } from 'react-router'
import Modal from './modal/Modal'
import DeleteDocument from './modal/DeleteDocument'
import { Title, CourseListUpdate, Category, CustomDate, AuthorList, AdviserList, TopicList } from './CardDetails'
import { formatDateOnly } from '../helpers/Helpers'
import './SearchCard.css'

function SpCard(props) {

	// Create reference to modal
	const deleteModal = useRef(null)
	const openDeleteModal = (user, props) => {deleteModal.current.open(user, props)}
	const history = useHistory();

  /**
	 * handle download, edit, delete actions inside these functions
	 * properties of the doc such as _id can be accessed via props.doc
	 */ 
	function handleDownload(){
		console.log('[SP] when download button clicked: ', props.doc);
	}

	function handleEdit(){
		history.push({ 
			pathname: `/search/editDocument/${props.doc._id}`,
			state: { fromButtonEdit: true, type: "sp" }
		});
	}

	function handleDelete(){
		openDeleteModal();
	}

	return(
    
		<Card className= "doc-card" style={{backgroundColor: '#F4F4F4'}} title={props.doc.title}>
			<CardActionArea className="doc-title" onClick={() => history.push({pathname: `/search/${props.doc._id}`, state: { fromButtonEdit: false, type: "sp" }})}>
				<Title title={props.doc.title} />
			</CardActionArea>

			<div className="doc-content">				
				<div className="doc-year-category">
					<CustomDate date={props.doc.pub_date} />
					<Category category={props.doc.type} />
				</div>

				<div className="doc-other-details">
					<div>
						<AuthorList author={props.doc.author} clickable={false} />
						<AdviserList adviser={props.doc.adviser} />
						<CourseListUpdate course={props.doc.courses} />
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
			<Modal ref={deleteModal}><DeleteDocument sp={props.doc} type={props.doc.type}/></Modal>
		</Card>
	);
}


export default SpCard;