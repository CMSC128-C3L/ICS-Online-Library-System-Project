import React, { useContext } from 'react'; 
import SearchContext from './SearchContext'

function ResultPane(){
  const searchContext = useContext(SearchContext);
  return(
    <div>
      {/* TEMPORARY STUFF HERE. SOLELY FOR CHECKING. */}

        This pane is notified of the ff updates due to<br/>
        1)making states available globally<br/>
        2)and dispatching state updates from components<br/>
        via Context and useReducer


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