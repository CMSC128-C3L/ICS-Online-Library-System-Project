import "./App.css";
import Container from '@material-ui/core/Container';
import FilterSideBar from "./Components/FilterSideBar";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <FilterSideBar/>
    </div>
  );
}

export default App;
