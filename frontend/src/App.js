import FilterSideBar from "./Components/filter_sidebar/FilterSideBar";
import Navbar from "./Components/navigation_bar/Navbar";
import SearchResults from "./Components/search_results/SearchResults";
import Footer from './Components/footer/Footer';
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <FilterSideBar/>
      <SearchResults/>
      <Footer/>
    </div>
  );
}

export default App;
