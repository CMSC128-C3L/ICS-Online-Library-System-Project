import './App.css';
import AdminHome from './pages/AdminHome';
import { BrowserRouter, Switch } from 'react-router-dom';
import AdminAnalytics from './pages/AdminAnalytics'
import AdminDocManagement from './pages/AdminDocManagement'
import AdminUserManagement from './pages/AdminUserManagement'
import {BrowserRouter as Link, Router, Route} from 'react-router-dom'
import Footer from './components/footer/Footer'
import SearchPage from './pages/SearchPage'
import GuestHome from './pages/GuestHome'
import SummaryPage from './pages/SummaryPage'
import SummaryPageAuthor from './pages/SummaryPageAuthor'
import EditCardsPage from './pages/EditCardsPage'
import CardEditingPage from './pages/CardEditingPage'

function App() {
  return (
    <div className="App"> 
      <BrowserRouter> 
        <Switch>
          <Route exact path="/" component={GuestHome} />
          <Route exact path="/loggedIn/home/1:id" component={AdminHome} />
          <Route exact path="/loggedIn/home/2:id" component={GuestHome} />
          <Route exact path="/loggedIn/adminHome/1:id" component={AdminHome}/>
          <Route exact path="/manageUsers"  component={AdminUserManagement} />
          <Route exact path="/manageDocuments"  component={AdminDocManagement} />
          <Route exact path="/browseAnalytics" component={AdminAnalytics} />
          <Route exact path="/search" component={SearchPage} />
          <Route exact path="/courseSummary" component={SummaryPage} />
          <Route exact path="/authorSummary" component={SummaryPageAuthor} />
          <Route exact path="/editCards" component={EditCardsPage}/>
          <Route exact path="/cardEditing" component={CardEditingPage}/>
        </Switch>
      </BrowserRouter>
      <Footer></Footer>
    </div>
  )
}
export default App
