import { requirePropFactory } from '@material-ui/core'
import React, { Component } from 'react'
import './Section.css'
import logo from './../../assets/128.png'

import aaron from './../../assets/profilePictures/Aaron.png'
import alwin from './../../assets/profilePictures/Alwin.png'
import bullet from './../../assets/profilePictures/Bullet.png'
import elsha from './../../assets/profilePictures/Elsha.png'
import janos from './../../assets/profilePictures/Janos.png'
import jeri from './../../assets/profilePictures/Jeri.png'
import lester from './../../assets/profilePictures/Lester.png'
import ralf from './../../assets/profilePictures/Ralf.png'
import robert from './../../assets/profilePictures/Robert.png'
import sam from './../../assets/profilePictures/Sam.png'
import tin from './../../assets/profilePictures/Tin.png'
import vince from './../../assets/profilePictures/Vince.png'
import undefined from './../../assets/profilePictures/undefined.png'

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
                    <div className="Team-name">
                        Frontend
                    </div>
                    <div className="card-grid">
                        <div className="person-card">
                            <div className="profile-picture">
                                <img src={jeri} style={{width: '75%'}}/>
                            </div>
                            <div className="person-name">
                                Jeri
                            </div>
                        </div>
                        <div className="person-card">
                            <div className="profile-picture">
                                <img src={undefined} style={{width: '75%'}}/>
                            </div>
                            <div className="person-name">
                                Keisha
                            </div>
                        </div>
                        <div className="person-card">
                            <div className="profile-picture">
                                <img src={alwin} style={{width: '75%'}}/>
                            </div>
                            <div className="person-name">
                                Alwin
                            </div>
                        </div>
                        <div className="person-card">
                            <div className="profile-picture">
                                <img src={undefined} style={{width: '75%'}}/>
                            </div>
                            <div className="person-name">
                                Rener
                            </div>
                        </div>
                        <div className="person-card">
                            <div className="profile-picture">
                                <img src={elsha} style={{width: '75%'}}/>
                            </div>
                            <div className="person-name">
                                Elsha
                            </div>
                        </div>
                    </div>

                    <div className="Team-name">
                        Backend
                    </div>
                    <div className="card-grid">
                        <div className="person-card">
                            <div className="profile-picture">
                                <img src={janos} style={{width: '75%'}}/>
                            </div>
                            <div className="person-name">
                                Janos
                            </div>
                        </div>
                        <div className="person-card">
                            <div className="profile-picture">
                                <img src={aaron} style={{width: '75%'}}/>
                            </div>
                            <div className="person-name">
                                Aaron
                            </div>
                        </div>
                        <div className="person-card">
                            <div className="profile-picture">
                                <img src={ralf} style={{width: '75%'}}/>
                            </div>
                            <div className="person-name">
                                Ralf
                            </div>
                        </div>
                        <div className="person-card">
                            <div className="profile-picture">
                                <img src={sam} style={{width: '75%'}}/>
                            </div>
                            <div className="person-name">
                                Sam
                            </div>
                        </div>
                        <div className="person-card">
                            <div className="profile-picture">
                                <img src={vince} style={{width: '75%'}}/>
                            </div>
                            <div className="person-name">
                                Vince
                            </div>
                        </div>
                    </div>

                    <div className="Team-name">
                        Database
                    </div>
                    <div className="card-grid">
                        <div className="person-card">
                            <div className="profile-picture">
                                <img src={undefined} style={{width: '75%'}}/>
                            </div>
                            <div className="person-name">
                                Neo
                            </div>
                        </div>
                        <div className="person-card">
                            <div className="profile-picture">
                                <img src={tin} style={{width: '75%'}}/>
                            </div>
                            <div className="person-name">
                                Tin
                            </div>
                        </div>
                        <div className="person-card">
                            <div className="profile-picture">
                                <img src={lester} style={{width: '75%'}}/>
                            </div>
                            <div className="person-name">
                                Lester
                            </div>
                        </div>
                        <div className="person-card">
                            <div className="profile-picture">
                                <img src={bullet} style={{width: '75%'}}/>
                            </div>
                            <div className="person-name">
                                Bullet
                            </div>
                        </div>
                        <div className="person-card">
                            <div className="profile-picture">
                                <img src={robert} style={{width: '75%'}}/>
                            </div>
                            <div className="person-name">
                                Robert
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
