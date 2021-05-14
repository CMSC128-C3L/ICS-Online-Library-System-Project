import React, { useReducer } from 'react';
import FilterSideBar from "../Components/filter_sidebar/FilterSideBar";
import Navbar from "../Components/navigation_bar/Navbar";
// import SearchResults from "./Components/search_results/Books";
import Footer from '../Components/footer/Footer';

function SearchPage() {

  return (
    <div className="SearchPage">
      <Navbar className="nav"/>
      <div className="main">
        <FilterSideBar className="sidebar"/>
        <div>Results</div>
      </div>
      <Footer className="footer"/>
    </div>
  );
}

export default SearchPage;
