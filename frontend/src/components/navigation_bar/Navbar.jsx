import React, { useContext, useState, useEffect } from 'react';
import './Navbar.css';
import icsLogo from '../../assets/ics_logo.png';
import searchIcon from '../../assets/magnifying_glass.png';
import SearchContext from '../search_results/SearchContext';
import { UserContext } from '../user/UserContext';
import Logout from '../login_search/Logout';
import Login from '../login_search/Login';
import { useHistory } from 'react-router';
import ConditionalTools from './ConditionalTools';
import Button from '@material-ui/core/Button';
import updateQueryString from '../search_results/UpdateQueryString';
import decode from 'jwt-decode';

function Navbar(props){
    const {loggedUser, setLoggedUser} = useContext(UserContext)
    const data = (localStorage.length != 0) ? decode(localStorage.getItem('token')) : '{}'
    const searchContext = useContext(SearchContext);
    const history = useHistory();

	// for tracking the local changes on query being typed
	const [query, setQuery] = useState('');
    const [changed, setChanged] = useState(false);
	const handleChange = (event) =>{
		setQuery(event.target.value);
	};

	// for dispatching the submitted query to be used in showing results
	const handleSubmit = (event) => {
		event.preventDefault()
        searchContext.dispatch({
			type: props.action,
			query: query
		})
    };

    const renderComponentsBasedOnState = () =>{
        if(data === '{}'){
            return(
                <div className="useraccount">
                    <Login/>
                    <Button onClick={() => history.push('/support')} style={{fontSize: "17px"}}>Support</Button>
                </div>
            )
        }

        else{
            return(
                <div className="useraccount">
                    <div className="container">
                        {data.given_name}
                        <Logout/>
                    </div>
                </div>
            )
        }
    }

    return(
        <div className="Navbar">
                {/* LEFT SIDE START */}
                {/* <div className="leftSide"> <img src={icsLogo} alt="logo"/> </div> */}
                {/* LEFT SIDE END */}
                
                {/* MIDDLE SIDE START */}
                <div className="middleSide">
                    {/* MIDDLE-TOP SIDE START */}
                    <div className="topSide">
                        <div className="search">
                            <div className="icon-input">
                                 <form onChange={ handleChange } onSubmit={ handleSubmit } action="">
                                    <input type="text" placeholder="Search..." defaultValue={searchContext.state.query}/>
                                    <button type="submit" onClick={ handleSubmit }><img src={searchIcon} alt="SearchIcon" /></button>
                                </form>
                            </div>
                        </div>
                    </div>
                    {/* MIDDLE-TOP SIDE END */}

                    {/* MIDDLE-BOTTOM SIDE START */}
                    <div className="bottomSide">
                        <ConditionalTools/>
                    </div>
                    {/* MIDDLE-BOTTOM SIDE END */}
                </div>
                {/* MIDDLE SIDE END */}

                {/* RIGHT SIDE START */}
                <div className="rightSide">
                    {renderComponentsBasedOnState()}
                </div>
                {/* RIGHT SIDE END */}
        </div>
    );
}

export default Navbar;