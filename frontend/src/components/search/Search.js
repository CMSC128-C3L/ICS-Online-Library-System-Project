import './Search.css'
import {useHistory} from 'react-router-dom'

function Search() {
    const history = useHistory();
    return (                    
        <form className="Search-area">
            <input className="App-search-bar" type="text" placeholder="Search..."/>
            
            <br/>
            <div className="Search-container">
                <div>
                    <input id="books-radio" type="radio" name="search-type" value="search-books"/>
                    <label className="Radio-label" htmlFor="books-radio">  Books</label>
                </div>
                <div>
                    <input id="journal-radio" type="radio" name="search-type" value="search-journal"/>
                    <label className="Radio-label" htmlFor="journal-radio">  Journals</label>
                </div>
                <div>
                    <input id="sp-radio" type="radio" name="search-type" value="search-sp"/>
                    <label className="Radio-label" htmlFor="sp-radio">  SP</label>
                </div>
                <div>
                    <input id="thesis-radio" type="radio" name="search-type" value="search-thesis"/>
                    <label className="Radio-label" htmlFor="thesis-radio">  Thesis</label>
                </div>                  
            </div>
                
            <br/>
            <button className="Search-btn">Search</button>
        </form>
    )
}

export default Search