import React, {useState} from 'react';
import Card from '../cards/Card';
import './CardEditing.css';

function CardEditing(props){
    return (
        <div className="page-container">

            <div className="grid-container">
                
                <div className="border">
                    <Card className="card" content={contentprop}/>
                </div>
                <div className="border grid-container-vertical">
                    <div className="border text-label">Description</div>
                    <input className="rounded text-label" type="text"/>
                    <div className="border text-label"><p/>Link</div>
                    <input className="rounded border text-label" type="text"/><p/>
                    <input classname="rounded border text-label" text="Upload" type="file" id="img" name="img" accept="image/*"/>
                    
                    <div className="btn-border">
                        <button className="save button text-label">Save</button>
                        <button className="cancel button text-label">Cancel</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

const contentprop = {
    header : "Advisory",
    title : "Lorem ipsum dolor sit amet"
}

export default CardEditing