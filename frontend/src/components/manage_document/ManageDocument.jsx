import React from 'react';
import { useParams } from 'react-router';
import ConditionalEdit from './ConditionalEdit';
import axios from 'axios';
import './DocumentCard.css';

/**
 * functional component
 * handles function for document attribute updates
 * uses axios.patch and set options for authorization
 */

function ManageDocument(props) {
    //authorization header
    const options = {
        headers: {'Authorization':  'Bearer ' + localStorage.getItem('token')},
        'Content-Type': 'application/json'
    }

    //get document id and type
    const {id} = useParams();
    const {type} = useParams();

	function handleDownload(){
		console.log('[Document] when download button clicked: ', {id});
        // insert method for download PDF
	}

    function handleSave(){
		console.log('[Document] when download button clicked: ', {id});
        // insert method for save PDF
	}

    const updatePDF = async(event) =>{
        console.log('[Document] when download button clicked: ', {id});
        // insert method for update PDF
	}

    const updateTitle = async(event) =>{
        //patch request to update document title
        try {
            event.preventDefault();
            const response = await axios.patch(`/api/books/${id}`, {title: event.target.value} , options);
            console.log('Returned data:', response.data);
        } catch (e) {
            console.log(`Axios request failed: ${e}`);
        }
	}

    const updateType = async(event) =>{
        //patch request to update document title
        try {
            event.preventDefault();
            const response = await axios.patch(`/api/books/${id}`, {type: event.target.value} , options);
            console.log('Returned data:', response.data);
        } catch (e) {
            console.log(`Axios request failed: ${e}`);
        }
	}

    //temporarily not updating, waiting for book controller changes (and array format)
    const updateAuthor = async(event) =>{
        //patch request to update document author
        try {
            event.preventDefault();
            const response = await axios.patch(`/api/books/${id}`, {author: [event.target.value]} , options);
            console.log('Returned data:', response.data);
        } catch (e) {
            console.log(`Axios request failed: ${e}`);
        }
	}

    const updateYear = async(event) =>{
        // //patch request to update document year published
        try {
            event.preventDefault();
            const response = await axios.patch(`/api/books/${id}`, {year: parseInt(event.target.value)} , options);
            console.log('Returned data:', response.data);
        } catch (e) {
            console.log(`Axios request failed: ${e}`);
        }
	}

    const updatePublisher = async(event) =>{
        //patch request to update document publisher
        try {
            event.preventDefault();
            const response = await axios.patch(`/api/books/${id}`, {publisher: event.target.value} , options);
            console.log('Returned data:', response.data);
        } catch (e) {
            console.log(`Axios request failed: ${e}`);
        }
	}

    const updateISBN = async(event) =>{
        //patch request to update document ISBN
        try {
            event.preventDefault();
            const response = await axios.patch(`/api/books/${id}`, {isbn: event.target.value} , options);
            console.log('Returned data:', response.data);
        } catch (e) {
            console.log(`Axios request failed: ${e}`);
        }
	}

    const updateDescription= async(event) =>{
        //patch request to update document ISBN
        try {
            event.preventDefault();
            const response = await axios.patch(`/api/books/${id}`, {description: event.target.value} , options);
            console.log('Returned data:', response.data);
        } catch (e) {
            console.log(`Axios request failed: ${e}`);
        }
	}

    const updateAdviser = async(event) =>{
        //patch request to update document adviser
        try {
            event.preventDefault();
            const response = await axios.patch(`/api/${type}/${id}`, {adviser: event.target.value} , options);
            console.log('Returned data:', response.data);
        } catch (e) {
            console.log(`Axios request failed: ${e}`);
        }
	}

    const updatePubDate = async(event) =>{
        //patch request to update document publishing date
        try {
            event.preventDefault();
            const response = await axios.patch(`/api/${type}/${id}`, {pub_date: event.target.value} , options);
            console.log('Returned data:', response.data);
        } catch (e) {
            console.log(`Axios request failed: ${e}`);
        }
	}

    return (
            <div className="edit-main-content">
                {
                    <ConditionalEdit 
                    handleDownload={handleDownload} 
                    updatePDF={updatePDF}
                    handleSave={handleSave}
                    updateType={updateType}
                    updateTitle={updateTitle}
                    updateAuthor={updateAuthor}
                    updateYear={updateYear}
                    updatePublisher={updatePublisher}
                    updateISBN={updateISBN}
                    updateAdviser={updateAdviser}
                    updatePubDate={updatePubDate}
                    updateDescription={updateDescription}
                    /> 
                }
            </div>
    )
}

export default ManageDocument