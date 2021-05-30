import './App.css';
import React, {useState, useMemo} from 'react';
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
<<<<<<< HEAD
import EditCardsPage from './pages/EditCardsPage'
import CardEditingPage from './pages/CardEditingPage'
=======
import { UserContext } from './components/user/UserContext';
import HomePageRoute from './components/route/HomePageRoute';
import AdminPageProtectRoute from './components/route/AdminPageProtectRoute';
import SeeDocument from './pages/SeeDocument'
>>>>>>> 9d60341d2e5508d291602e40b34f3b4804d01ded

function App() {
  const [loggedUser, setLoggedUser] = useState({});
  
  //create what the value is
  const providerValue = useMemo(() => [{loggedUser, setLoggedUser}], [loggedUser, setLoggedUser])
  
  return (
    <div className="App"> 
      <BrowserRouter> 
        <Switch>
<<<<<<< HEAD
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
=======
          <UserContext.Provider value={{loggedUser, setLoggedUser}}>
            <Route exact path="/" component={GuestHome} />
            <Route exact path="/loggedIn/" component={GuestHome} />
            <HomePageRoute exact path="/adminHome" component={AdminHome} />
            <AdminPageProtectRoute exact path="/adminHome/manageUsers" component={AdminUserManagement} />
            <AdminPageProtectRoute exact path="/adminHome/manageDocuments"  component={SearchPage} />
            <Route exact path="/search/:id"  component={SeeDocument} />
            <AdminPageProtectRoute exact path="/adminHome/browseAnalytics" component={AdminAnalytics} />
            <Route exact path="/search" component={SearchPage} />            
            <Route exact path="/search/filter/:id" component={SearchPage} />
            <Route exact path="/courseSummary" component={SummaryPage} />
            <Route exact path="/authorSummary" component={SummaryPageAuthor} />
          </UserContext.Provider>
>>>>>>> 9d60341d2e5508d291602e40b34f3b4804d01ded
        </Switch>
      </BrowserRouter>
      <Footer></Footer>
    </div>
  )
}
export default App
