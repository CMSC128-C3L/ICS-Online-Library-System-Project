import React from 'react';
import ConditionalEdit from './ConditionalEdit';
import './DocumentCard.css';

function ManageDocument(props) {
	function handleDownload(){
		console.log('[Document] when download button clicked: ', props.doc);
        // insert method for download PDF
	}

	function handleEdit(){
		console.log('[Document] when edit button clicked: ', props.doc);
		// insert method for edit PDF
	}

    return (
            <div className="edit-main-content">
                {
                    <ConditionalEdit 
                    handleDownload={handleDownload} 
                    handleEdit={handleEdit}> 
                    </ConditionalEdit>
                }
            </div>
    )
}

export default ManageDocument