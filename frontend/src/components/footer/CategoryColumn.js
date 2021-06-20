import './Footer.css'
import React, { useState, useContext } from 'react';
import {useHistory} from 'react-router-dom'
import SearchContext from '../search_results/SearchContext'
import updateQueryString from '../search_results/UpdateQueryString';
export const ACTIONS = {
    updateQuery: 'UPDATE_QUERY',
    updateCategory: 'UPDATE_CATEGORY',
    updateCourseCode: 'UPDATE_COURSE_CODE',
    updateTopic: 'UPDATE_TOPIC',
    reset: 'RESET'
}

function fixLinks(word) {
    if (word === "Home")  return "/adminHome"
    else if (word === "About Us") return "/aboutUs"
    else if (word === "Support") return "/support"
    else return "/search"
}


function CategoryColumn(props){
    const searchContext = useContext(SearchContext);
    const [query, setQuery] = useState('');
    const history = useHistory();
    const handleChange = (item) =>{
        console.log(item)
        if(item === "SP") {
            item = 'Special Problems'
            console.log(item)
        }
        else if (item === "Thesis") item = "Theses"
        searchContext.dispatch({ type: props.action, item: item})
        searchContext.dispatch({
            type: props.action,
			query: query
		})
        updateQueryString(searchContext);
        history.push('/search');
    }
    const resetChange = () =>{
        searchContext.dispatch({
            type: ACTIONS.reset,
		})
    }
    const title = <> <div className="category-title">{props.content.title}</div> <hr className="foothr"/> </>
    let links;

    // Render links if category serves as navigation tool
    // Else, show social media icons
    if(props.content.isNav)
        props.content.isSearch
        ?   links = <> <div className="column"> {(props.content.links.map(link => link == 'Home' ? <a className="a" href={fixLinks(link)} onClick={() => resetChange()} key={link}> {link} </a> : <a className="a" onClick={() => handleChange(link)} key={link}> {link} </a>))} </div> </>
        :   links = <> <div className="column"> {(props.content.links.map(link => <a className="a" href={fixLinks(link)} key={link}> {link} </a>))} </div> </>
    else{
        links = <> 

        <a className="a" href="https://www.facebook.com/ICS.UPLB" target="_blank" rel="noreferrer noopener">
            <svg className="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"/>
            </svg>
        </a>

        <a className="a" href="https://www.twitter.com/ics_uplb" target="_blank" rel="noreferrer noopener">
            <svg className="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z"/>
            </svg>
        </a>
        </>
    }

    return (
        <div className="category-column">
            {title}
            {links}
        </div>
    )
}

export default CategoryColumn