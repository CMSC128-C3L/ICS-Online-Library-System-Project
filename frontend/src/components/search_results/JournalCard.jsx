import React, { useRef} from 'react'
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import ConditionalIcon from "./ConditionalIcon"
import { useHistory } from 'react-router'
import Modal from './modal/Modal'
import DeleteDocument from './modal/DeleteDocument'
import { Title, Category, AuthorList, AdviserList, TopicList } from './CardDetails'
import './SearchCard.css'

function JournalCard(props) {

	 const deleteModal = useRef(null)
	 const openDeleteModal = (user, props) => {deleteModal.current.open(user, props)}
	 const history = useHistory()

	/**
	 * handle download, edit, delete actions inside these functions
	 * properties of the doc such as _id can be accessed via props.doc
	 */ 
	function handleDownload(){
		console.log('[JOURNAL] when download button clicked: ', props.doc);
	}

	function handleEdit(){
		history.push({ 
			pathname: `/search/editDocument/${props.doc._id}`,
			state: { fromButtonEdit: true, type: "journal"}
		   });
	}

	function handleDelete(){
		openDeleteModal();
	}

	return(
		<Card className= "doc-card" style={{backgroundColor: '#F4F4F4'}} title={props.doc.title}>
			<CardActionArea className="doc-title" onClick={() => history.push({pathname: `/search/${props.doc._id}`, state: { fromButtonEdit: false, type: "journal" }})}>
				<Title title={props.doc.title} />
			</CardActionArea>

			<div className="doc-content">
				<div className="doc-year-category">
          {/* pub date not rendered temporarily, date needs formatting */}
					<Category category={'Journal'} />
				</div>

					<div className="doc-other-details">
						<div>
							<AuthorList author={props.doc.author}  clickable={false} />
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
				<Modal ref={deleteModal}><DeleteDocument/></Modal>
		</Card>
	);
}


export default JournalCard;