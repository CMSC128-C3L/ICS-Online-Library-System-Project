import React from 'react'
import './SideDescription.css'

function SideDescription(props){
    return(
        <div className="sidecard flex-left text margin-bot-1">
            <div className="margin-bot-1">
                <h4 className="desc-header space-0">Prerequisities</h4>
                <ul className="list space-0">
                    {
                        props.children.map((prereq, i)=>{
                            return <li>{prereq}</li>
                        })
                    }
                </ul>
            </div>

            <div>
                <h4 className="desc-header space-0">Description</h4>
                <p className="space-0">{props.description}</p>
            </div>
        </div>
    )
}

export default SideDescription