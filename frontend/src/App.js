import './App.css';
import AdminHome from './pages/AdminHome';
import { BrowserRouter, Switch } from 'react-router-dom';
import AdminAnalytics from './pages/AdminAnalytics'
import AdminDocManagement from './pages/AdminDocManagement'
import AdminUserManagement from './pages/AdminUserManagement'
import {BrowserRouter as Route} from 'react-router-dom'

function App() {
  return (
    <div className="App"> 
      <BrowserRouter> 
        <Switch>
        <Route exact path="/" component={AdminHome}/>
        <Route exact path="/manageUsers"  component={AdminUserManagement} />
        <Route exact path="/manageDocuments"  component={AdminDocManagement} />
        <Route exact path="/browseAnalytics" component={AdminAnalytics} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
