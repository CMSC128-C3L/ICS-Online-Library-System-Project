import React, { useContext, useState } from 'react';
import './Navbar.css';
import icsLogo from '../../assets/ics_logo.png';
import searchIcon from '../../assets/magnifying_glass.png';
import SearchContext from '../search_results/SearchContext';

function Navbar(props){
    const searchContext = useContext(SearchContext);

	// for tracking the local changes on query being typed
	const [query, setQuery] = useState('');

	const handleChange = (event) =>{
		setQuery(event.target.value);
	};
	
	// for dispatching the submitted query to be used in showing results
	const handleSubmit = (event) => {
		event.preventDefault()
		console.log("in handle submit ", query);
        searchContext.dispatch({
			type: props.action,
			query: query
		});
    };


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
                                {/* <form onSubmit={props.searchBook} action="">
                                    <input onChange={props.handleSearch} type="text" placeholder="Search..."/>
                                    <button type="submit" onClick={props.handleClick}><img src={searchIcon} alt="SearchIcon" /></button>
                                </form> */}
                                 <form onChange={ handleChange } onSubmit={ handleSubmit } action="">
                                    <input type="text" placeholder="Search..."/>
                                    <button type="submit" onClick={ handleSubmit }><img src={searchIcon} alt="SearchIcon" /></button>
                                </form>
                            </div>
                        </div>
                    </div>
                    {/* MIDDLE-TOP SIDE END */}

                    {/* MIDDLE-BOTTOM SIDE START */}
                    <div className="bottomSide">
                        <div className="links">
                            <a href="/">Home</a>
                            <a href="/search">Browse</a>
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