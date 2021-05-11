import React from 'react';
import '../App.css';

function Navbar(){
    return(
        <div className="Navbar">
                {/* LEFT SIDE START */}
                <div className="leftSide">
                    <img src="ics_logo.png" alt="logo"/>
                </div>
                {/* LEFT SIDE END */}

                {/* MIDDLE SIDE START */}
                <div className="middleSide">
                    {/* MIDDLE-TOP SIDE START */}
                    <div className="topSide">
                        <div className="search">
                            <div className="icon-input">
                                <input type="text" placeholder="Search..."/>
                                    {/* <a href = "/temporary search function">
                                    <img src='magnifying_glass.png' alt="search icon" onClick={"temporary"}/> */}
                                    <button><img src="magnifying_glass.png" alt="SearchIcon" onClick={"insert function call"} /></button>
                                    {/* </a> */}
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