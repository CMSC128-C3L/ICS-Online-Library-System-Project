import React, { useContext } from 'react'; 
import SearchContext from './SearchContext'
import BookCard from './BookCard';
import IconButton from '@material-ui/core/IconButton';
import DownloadIcon from '@material-ui/icons/GetApp';

function ResultPane(){
  const searchContext = useContext(SearchContext);
  return(
    <div>
      {/* TEMPORARY STUFF HERE. SOLELY FOR CHECKING. */}
      <BookCard imgURL="" title="My TitleMy TitleMy TitleMy TitleMy Title" year="Year" category="CATEGORY" author={["Author A", "Author B"]} 
      isbn="ISBN-ISBN-ISBN" courseCode="CMSC 128" topic={['Topic1', 'Topic2', 'Topic3']}/>

        This pane is notified of the ff updates due to<br/>
        1)making states available globally<br/>
        2)and dispatching state updates from components<br/>
        via Context and useReducer

      <IconButton aria-label="download pdf">
        <DownloadIcon fontSize="large"/>
      </IconButton>
      <br/><h4>Query</h4>
      <p>{searchContext.state.query}</p>

      <br/><h4>Category</h4>
      {searchContext.state.category.map((category) => {
					return <p key={category}>{category}</p>
      })}
      <br/><h4>Course Code</h4>
      <p>{searchContext.state.courseCode}</p>
      
      <br/><h4>Topic</h4>
      {searchContext.state.topic.map((topic) => {
					return <p key={topic}>{topic}</p>
      })}

    </div>
  );
}


export default ResultPane;