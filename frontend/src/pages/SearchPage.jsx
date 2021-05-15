import React, { useReducer } from 'react';
import FilterSideBar from "../components/filter_sidebar/FilterSideBar";
import Navbar from "../components/navigation_bar/Navbar";
// import SearchResults from "./components/search_results/Books";
import Footer from '../components/footer/Footer';

function SearchPage() {

  return (
    <div className="SearchPage">
      <Navbar className="nav"/>
      <div className="main">
        <FilterSideBar className="sidebar"/>
        <div>Results</div>
      </div>
    </div>
  );
}

export default SearchPage;
