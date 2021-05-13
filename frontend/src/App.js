import FilterSideBar from "./Components/filter_sidebar/FilterSideBar";
// import Navbar from "./Components/navigation_bar/Navbar";
import SearchResults from "./Components/search_results/Books";
import Footer from './Components/footer/Footer';
import "./App.css";

function App() {
  return (
    <div className="App">
      <SearchResults/>
      <FilterSideBar/>
      <Footer/>
    </div>
  );
}

export default App;
