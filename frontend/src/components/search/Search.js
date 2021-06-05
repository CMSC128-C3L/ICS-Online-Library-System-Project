import './Search.css'
import React, {useState, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import SearchContext from '../search_results/SearchContext'

export const ACTIONS = {
  updateQuery: 'UPDATE_QUERY',
  updateCategory: 'UPDATE_CATEGORY',
  updateCourseCode: 'UPDATE_COURSE_CODE',
  updateTopic: 'UPDATE_TOPIC',
  reset: 'RESET'
}



function Search(props) {
    const [query, setQuery] = useState('');
    const history = useHistory();
    const searchContext = useContext(SearchContext)

    const handleChange = (event) =>{
		setQuery(event.target.value);
    };

    const handleSubmit = (event) =>{
        event.preventDefault()
        searchContext.dispatch({
			type: props.action,
			query: query
		})

        history.push('/search');
    }

    const enterSubmit = (event) =>{
        if(event.keyCode == 13){
            handleSubmit(event);
        }
    }
    return (                    
        <form className="Search-area">
            <input onKeyDown={enterSubmit} onChange={handleChange} onSubmit={handleSubmit} className="App-search-bar" type="text" placeholder="Search..."/>
            
            <br/>
            <div className="Search-container">
                <div>
                    <input id="books-check" type="checkbox" name="search-type" value="search-books"/>
                    <label className="Check-label" htmlFor="books-check">  Books</label>
                </div>
                <div>
                    <input id="journal-check" type="checkbox" name="search-type" value="search-journal"/>
                    <label className="Check-label" htmlFor="journal-check">  Journals</label>
                </div>
                <div>
                    <input id="sp-check" type="checkbox" name="search-type" value="search-sp"/>
                    <label className="Check-label" htmlFor="sp-check">  SP</label>
                </div>
                <div>
                    <input id="thesis-check" type="checkbox" name="search-type" value="search-thesis"/>
                    <label className="Check-label" htmlFor="thesis-check">  Thesis</label>
                </div>                  
            </div>
                
            <br/>
            <button className="Search-btn" onClick={handleSubmit}>Search</button>
        </form>
    )
}

export default Search