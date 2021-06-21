import './Search.css'
import React, {useState, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import SearchContext from '../search_results/SearchContext'
import HomeCategoryChecklist from './HomeCategoryChecklist';
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
    const category = {'name': 'Category', 'list': ["Books", "Special Problems", "Theses"]};
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
            <input onKeyDown={enterSubmit} onChange={handleChange} onSubmit={handleSubmit} className="App-search-bar" type="text" placeholder=" Search..."/>
            
            <br/>

            <div className="Search-container">
            <HomeCategoryChecklist list={category.list} action={ACTIONS.updateCategory} />
            </div>  
            <br/>
            <button className="Search-btn" onClick={handleSubmit}>Search</button>
        </form>
    )
}

export default Search