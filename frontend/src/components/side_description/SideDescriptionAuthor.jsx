import React from 'react'
import './SideDescription.css'
import '../adviser_summary/AdviserSummary.css'

function SideDescriptionAuthor(props){
    return(
        <div className="sidecard flex-left text margin-bot-1">
            <div className="margin-bot-1">
                <h4 className="desc-header space-0">Interests<p></p></h4>
                <ul className="list space-0">
                    {
                        props.children.map((topic, i)=>{
                            return <>
                                <li>{topic}</li>
                            </>
                        })
                    }
                </ul>
            </div>

            <div>
                <h4 className="desc-header space-0">Other information</h4>
                <p className="space-0">{props.description}</p>
            </div>
        </div>
    )
}

export default SideDescriptionAuthor