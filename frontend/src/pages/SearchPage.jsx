import { CallToActionSharp } from '@material-ui/icons';
import React, { useReducer } from 'react';
import FilterSideBar from "../components/filter_sidebar/FilterSideBar";
import Navbar from "../components/navigation_bar/Navbar";
import ResultPane from "../components/search_results/ResultPane";
import SearchContext from '../components/search_results/SearchContext';
// import SearchResults from "./components/search_results/Books";

export const ACTIONS = {
  updateQuery: 'UPDATE_QUERY',
  updateCategory: 'UPDATE_CATEGORY',
  updateCourseCode: 'UPDATE_COURSE_CODE',
  updateTopic: 'UPDATE_TOPIC',
  reset: 'RESET'
}

/**
 * query is temporarily empty, may change once search from homepage is connected to this page
 */
const initialState = {
  query: '',
  category: [],
  courseCode: '',
  topic: [],
};

/**
* handleCheck called when reducer receives category or topic update action
* obtain index of checkbox item and toggle the state by including/excluding from checked list	
*/
function handleCheck(checked, item){
  const index = checked.indexOf(item);
  const newChecked = [...checked];

  // if item not in checked list, add; else, remove
  if(index === -1){
    newChecked.push(item);
  }else{
    newChecked.splice(index, 1);
  } 
  return newChecked;
}

/**
 * reducer acts on the dispatch received from the components (via context)
 * makes use of current state, and action type and data specified in dispatch
 */
const reducer = (state, action) => {
  switch(action.type){
    case ACTIONS.updateQuery:
      console.log("in reducer update query");
      return { ...state, query: action.query};
    case ACTIONS.updateCategory:
      return { ...state, category: handleCheck(state.category, action.item) };

    case ACTIONS.updateCourseCode:
      return {...state, courseCode: action.item}

    case ACTIONS.updateTopic:
      return { ...state, topic: handleCheck(state.topic, action.item) };
      
    // case ACTIONS.reset:
    //  return { initialState };

    default:
      return state;
  }
}

function SearchPage() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="SearchPage">
      <SearchContext.Provider value={{ state: state, dispatch: dispatch }}>
        <Navbar className="nav" action={ ACTIONS.updateQuery }/>
        <div className="main">
          <FilterSideBar className="sidebar"/>
          <ResultPane className="result-pane"/>
        </div>
      </SearchContext.Provider> 
    </div>
  );
}

export default SearchPage;
