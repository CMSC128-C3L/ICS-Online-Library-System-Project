import React from 'react';
import './Navbar.css';
import icsLogo from '../../assets/ics_logo.png';
import searchIcon from '../../assets/magnifying_glass.png';

function Navbar(props){
    return(
        <div className="Navbar">
                {/* LEFT SIDE START */}
                <div className="leftSide"> <img src={icsLogo} alt="logo"/> </div>
                {/* LEFT SIDE END */}
                
                {/* MIDDLE SIDE START */}
                <div className="middleSide">
                    {/* MIDDLE-TOP SIDE START */}
                    <div className="topSide">
                        <div className="search">
                            <div className="icon-input">
                                <form onSubmit={props.searchBook} action="">
                                    <input onChange={props.handleSearch} type="text" placeholder="Search..."/>
                                    <button type="submit" onClick={props.handleClick}><img src={searchIcon} alt="SearchIcon" /></button>
                                </form>
                            </div>
                        </div>
                    </div>
                    {/* MIDDLE-TOP SIDE END */}

                    {/* MIDDLE-BOTTOM SIDE START */}
                    <div className="bottomSide">
                        <div className="links">
                            <a href="/home">Home</a>
                            <a href="/browse">Browse</a>
                            <a href="/tools">Tools</a>
                        </div>
                    </div>
                    {/* MIDDLE-BOTTOM SIDE END */}
                </div>
                {/* MIDDLE SIDE END */}

                {/* RIGHT SIDE START */}
                <div className="rightSide">
                    <div className="useraccount">
                        Fname Lname
                        <a href="/logout">Logout</a>
                    </div>  
                </div>
                {/* RIGHT SIDE END */}
        </div>
    );
}

export default Navbar;