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
import rener from './../../assets/profilePictures/Rener.png'
import keisha from './../../assets/profilePictures/Keisha.png'
import neo from './../../assets/profilePictures/Neo.png'
import undefined from './../../assets/profilePictures/undefined.png'

export default class AboutUs extends Component {
    render() {
        return (
            <>
                <div className="Section-area">
                    <div className="Left-section">
                        <div className="circular--portrait">
                            <img alt="" src={logo} style={{width: '80%'}}/>
                        </div>
                    </div>
                    <div className="Right-section">
                        <div className="Section-above">
                            <div className="Section-title">
                                Section C-3L
                            </div>
                            <div className="Section-subtitle">
                            CMSC 128 • ICS, UPLB<br/>
                            Second Semester, A.Y. 2020 - 2021
                            </div>
                        </div>
                        <br/>
                        <div className="Section-body">
                            One among nine sections that remotely took CMSC 128 - Introduction to Software Engineering in the middle of a pandemic, Section C-3L is a diverse bunch of student developers from the University of the Philippines Los Baños. With the unprecedented shift to alternative modes of learning, the developers sought to create a system that is both relevant and useful to the current situation. The result is EyeCS: Window to Knowledge, an accessible, reliable, and user-friendly online library system for students and teachers of the Institute of Computer Science, UPLB. Below is the roster of students who worked hand in hand to bring this library to fruition, under the leadership of the project's manager Jeri Ogbinar.
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
                                <img alt="" src={jeri} style={{width: '75%'}}/>
                            </div>
                            <div className="person-name">
                                Jeri
                            </div>
                        </div>
                        <div className="person-card">
                            <div className="profile-picture">
                                <img alt=""src={keisha} style={{width: '75%'}}/>
                            </div>
                            <div className="person-name">
                                Keisha
                            </div>
                        </div>
                        <div className="person-card">
                            <div className="profile-picture">
                                <img alt="" src={alwin} style={{width: '75%'}}/>
                            </div>
                            <div className="person-name">
                                Alwin
                            </div>
                        </div>
                        <div className="person-card">
                            <div className="profile-picture">
                                <img alt=""src={rener} style={{width: '75%'}}/>
                            </div>
                            <div className="person-name">
                                Rener
                            </div>
                        </div>
                        <div className="person-card">
                            <div className="profile-picture">
                                <img alt="" src={elsha} style={{width: '75%'}}/>
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
                                <img alt="" src={janos} style={{width: '75%'}}/>
                            </div>
                            <div className="person-name">
                                Janos
                            </div>
                        </div>
                        <div className="person-card">
                            <div className="profile-picture">
                                <img alt=""src={aaron} style={{width: '75%'}}/>
                            </div>
                            <div className="person-name">
                                Aaron
                            </div>
                        </div>
                        <div className="person-card">
                            <div className="profile-picture">
                                <img alt=""src={ralf} style={{width: '75%'}}/>
                            </div>
                            <div className="person-name">
                                Ralf
                            </div>
                        </div>
                        <div className="person-card">
                            <div className="profile-picture">
                                <img alt=""src={sam} style={{width: '75%'}}/>
                            </div>
                            <div className="person-name">
                                Sam
                            </div>
                        </div>
                        <div className="person-card">
                            <div className="profile-picture">
                                <img alt=""src={vince} style={{width: '75%'}}/>
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
                                <img alt=""src={neo} style={{width: '75%'}}/>
                            </div>
                            <div className="person-name">
                                Neo
                            </div>
                        </div>
                        <div className="person-card">
                            <div className="profile-picture">
                                <img alt=""src={tin} style={{width: '75%'}}/>
                            </div>
                            <div className="person-name">
                                Tin
                            </div>
                        </div>
                        <div className="person-card">
                            <div className="profile-picture">
                                <img alt=""src={lester} style={{width: '75%'}}/>
                            </div>
                            <div className="person-name">
                                Lester
                            </div>
                        </div>
                        <div className="person-card">
                            <div className="profile-picture">
                                <img alt=""src={bullet} style={{width: '75%'}}/>
                            </div>
                            <div className="person-name">
                                Bullet
                            </div>
                        </div>
                        <div className="person-card">
                            <div className="profile-picture">
                                <img alt=""src={robert} style={{width: '75%'}}/>
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
