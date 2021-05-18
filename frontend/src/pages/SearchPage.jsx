import React, { useReducer } from 'react';
import FilterSideBar from "../components/filter_sidebar/FilterSideBar";
import Navbar from "../components/navigation_bar/Navbar";
import ResultPane from "../components/search_results/ResultPane";
import SearchContext from '../components/search_results/SearchContext';
// import SearchResults from "./components/search_results/Books";

export const ACTIONS = {
  updateCategory: 'UPDATE_CATEGORY',
  updateCourseCode: 'UPDATE_COURSE_CODE',
  updateTopic: 'UPDATE_TOPIC',
  reset: 'RESET'
}

const initialState = {
  category: [],
  courseCode: '',
  topic: [],
};

/*
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


const reducer = (state, action) => {
  switch(action.type){
    case ACTIONS.updateCategory:
      return { ...state, category: handleCheck(state.category, action.item) };

    case ACTIONS.updateCourseCode:
      return {...state, courseCode: action.item}

    case ACTIONS.updateTopic:
      return { ...state, topic: handleCheck(state.topic, action.item) };
      

    // case ACTIONS.reset:

    default:
      return state;
  }
}

function SearchPage() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="SearchPage">
      <SearchContext.Provider value={{ state: state, dispatch: dispatch }}>
        <Navbar className="nav"/>
        <div className="main">
          <FilterSideBar className="sidebar"/>
          <ResultPane className="result-pane"/>
        </div>
      </SearchContext.Provider> 
    </div>
  );
}

export default SearchPage;
