import Header from './components/header/Header'
import Search from './components/search/Search'
import Footer from './components/footer/Footer'
import CardRow from './components/cards/CardRow'
import './App.css'

function App() {
  return (
    <div className="App">
        <Header/>
        <Search/>
        <CardRow/>
        <Footer/>
    </div>
  );
}

export default App;
