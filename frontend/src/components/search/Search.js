import './Search.css'

function Search() {
    return (                    
        <form className="Search-area">
            <input className="App-search-bar" type="text" placeholder="Search..."/>
            
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
            <button className="Search-btn">Search</button>
        </form>
    )
}

export default Search