import React, {useState} from 'react'
import CardRow from '../cards/CardRow'
import './EditCards.css'
import EditIcon from '@material-ui/icons/Edit';

function EditCards(props){
    return (
        <div className="page-container">
            <div className="btn-cont">
                <div className="edit-btn" onclick={clickFirst}><EditIcon/></div>
                <div className="edit-btn" onclick={clickSecond}><EditIcon/></div>
                <div className="edit-btn" onclick={clickThird}><EditIcon/></div>
            </div>
            <CardRow/>
        </div>
    )
}

const clickFirst = () => {

}

const clickSecond = () => {
    
}

const clickThird = () => {
    
}

const advisoryprop = {
    header : "Advisory",
    title : "Lorem ipsum dolor sit amet"
}

const announcementsprop = {
    header : "Featured",
    title : "Lorem ipsum dolor sit amet"
}

const icsnewsprop = {
    header : "ICS News",
    title : "Lorem ipsum dolor sit amet"
}

export default EditCards