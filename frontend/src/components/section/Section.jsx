import { requirePropFactory } from '@material-ui/core'
import React, { Component } from 'react'
import './Section.css'
import logo from './../../assets/128.png'

export default class AboutUs extends Component {
    render() {
        return (
            <>
                <div className="Section-area">
                    <div className="Left-section">
                        <div className="circular--portrait">
                            <img src={logo} style={{width: '80%'}}/>
                        </div>
                    </div>
                    <div className="Right-section">
                        <div className="Section-above">
                            <div className="Section-title">
                                Section C-3L
                            </div>
                            CMSC 128 - ICS, UPLB<br/>
                            Second Semester, A.Y 2020 - 2021
                        </div>
                        <br/>
                        <div className="Section-body">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </div>
                    </div>
                </div>
                <div className="Roster-list">

                </div>
            </>
        )
    }
}
