import { requirePropFactory } from '@material-ui/core'
import React, { Component, useState } from 'react'
import Modal from 'react-modal'
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

import { roster } from './Roster'

const customStyles = {
    content: {
      top: '25%',
      left: '45%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      borderRadius: '8px',
      width: '20%',
      transform: 'translate(-40%, -10%)',
      alignItems: 'center'
    },
};



export default class AboutUs extends React.Component {
    constructor(props) {
        super(props); 
        this.searchName = this.searchName.bind(this)    
        this.state = {
            modalIsOpen: false,
            name: "",
            obj: {}
        } 
    } 
    searchName(name) {
        for (let i = 0; i < roster.length; i++){
            console.log(roster[i].name)
            if(roster[i].nname == name){
                this.setState({obj: roster[i]})
                this.setState({modalIsOpen: !this.state.modalIsOpen})
                break
            }
        }
    }
    render() {
        console.log(this.state.obj)
        return (
            <>
                <Modal isOpen={this.state.modalIsOpen} style={customStyles}>
                    <button id="close-button" onClick={() => this.setState(prevState => ({modalIsOpen: !prevState.modalIsOpen}))}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><defs/><path d="M23 20.168l-8.185-8.187L23 3.807 20.168 1l-8.182 8.179L3.81 1 1 3.81l8.186 8.196L1 20.19 3.81 23l8.203-8.192L20.193 23z"/></svg>
                    </button>
                    <div className="modalContainer">
                        {this.state.obj ? <img src={this.state.obj.picture} className="prof" style={{width: '50%'}}/> : '{}'}
                        <div className="modalTitle">{this.state.obj.name}</div><br/>
                        <div className="modalSubtitle">{this.state.obj.nname}</div><br/>
                        {this.state.obj.description}
                    </div>
                </Modal>
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
                        <div className="person-card" onClick={() => {this.searchName("Jeri")}}>
                            <div className="profile-picture">
                                <img src={jeri} style={{width: '75%'}}/>
                            </div>
                            <div className="person-name">
                                Jeri
                            </div>
                        </div>
                        <div className="person-card" onClick={() => {this.searchName("Keisha")}} >
                            <div className="profile-picture">
                                <img src={keisha} style={{width: '75%'}}/>
                            </div>
                            <div className="person-name">
                                Keisha
                            </div>
                        </div>
                        <div className="person-card" onClick={() => {this.searchName("Alwin")}} >
                            <div className="profile-picture">
                                <img src={alwin} style={{width: '75%'}}/>
                            </div>
                            <div className="person-name">
                                Alwin
                            </div>
                        </div>
                        <div className="person-card" onClick={() => {this.searchName("Rener")}} >
                            <div className="profile-picture">
                                <img src={rener} style={{width: '75%'}}/>
                            </div>
                            <div className="person-name">
                                Rener
                            </div>
                        </div>
                        <div className="person-card" onClick={() => {this.searchName("Elsha")}} >
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
                        <div className="person-card" onClick={() => {this.searchName("Janos")}} >
                            <div className="profile-picture">
                                <img src={janos} style={{width: '75%'}}/>
                            </div>
                            <div className="person-name">
                                Janos
                            </div>
                        </div>
                        <div className="person-card" onClick={() => {this.searchName("Aaron")}} >
                            <div className="profile-picture">
                                <img src={aaron} style={{width: '75%'}}/>
                            </div>
                            <div className="person-name">
                                Aaron
                            </div>
                        </div>
                        <div className="person-card" onClick={() => {this.searchName("Ralf")}} >
                            <div className="profile-picture">
                                <img src={ralf} style={{width: '75%'}}/>
                            </div>
                            <div className="person-name">
                                Ralf
                            </div>
                        </div>
                        <div className="person-card" onClick={() => {this.searchName("Sam")}} >
                            <div className="profile-picture">
                                <img src={sam} style={{width: '75%'}}/>
                            </div>
                            <div className="person-name">
                                Sam
                            </div>
                        </div>
                        <div className="person-card" onClick={() => {this.searchName("Vince")}} >
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
                        <div className="person-card" onClick={() => {this.searchName("Neo")}} >
                            <div className="profile-picture">
                                <img src={neo} style={{width: '75%'}}/>
                            </div>
                            <div className="person-name">
                                Neo
                            </div>
                        </div>
                        <div className="person-card" onClick={() => {this.searchName("Tin")}} >
                            <div className="profile-picture">
                                <img src={tin} style={{width: '75%'}}/>
                            </div>
                            <div className="person-name">
                                Tin
                            </div>
                        </div>
                        <div className="person-card" onClick={() => {this.searchName("Lester")}} >
                            <div className="profile-picture">
                                <img src={lester} style={{width: '75%'}}/>
                            </div>
                            <div className="person-name">
                                Lester
                            </div>
                        </div>
                        <div className="person-card" onClick={() => {this.searchName("Bullet")}} >
                            <div className="profile-picture">
                                <img src={bullet} style={{width: '75%'}}/>
                            </div>
                            <div className="person-name">
                                Bullet
                            </div>
                        </div>
                        <div className="person-card" onClick={() => {this.searchName("Robert")}} >
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