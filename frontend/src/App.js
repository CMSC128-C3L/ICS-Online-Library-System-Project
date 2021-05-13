import "./App.css";
import FilterSideBar from "./Components/filter_sidebar/FilterSideBar";
import Navbar from "./Components/navigation_bar/Navbar";
import SearchResults from "./Components/search_results/SearchResults";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <FilterSideBar/>
      <SearchResults/>
    </div>
  );
}

export default App;
