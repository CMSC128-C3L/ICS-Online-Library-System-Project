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
		console.log('[JOURNAL] when edit button clicked: ', props.doc);
		history.push({ 
			pathname: `/search/${props.doc._id}`,
			state: { fromButtonEdit: true, type: "journal"}
		   });
	}

	function handleDelete(){
		console.log('[JOURNAL] when delete button clicked: ', props.doc);
		openDeleteModal();
	}

	return(
		<Card className= "doc-card" style={{backgroundColor: '#F4F4F4'}}>
			<CardActionArea onClick={() => history.push(`/search/${props.doc._id}`)}>
				<Title title={props.doc.title} />
			</CardActionArea>

			<div className="doc-content">
				<div className="doc-year-category">
          {/* pub date not rendered temporarily, date needs formatting */}
					<Category category={'Journal'} />
				</div>

					<div className="doc-other-details">
						<div>
							<AuthorList author={props.doc.author} />
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