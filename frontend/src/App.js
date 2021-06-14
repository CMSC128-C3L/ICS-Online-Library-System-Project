import './App.css';
import React, {useState, useMemo, useReducer} from 'react';
import AdminHome from './pages/AdminHome';
import { BrowserRouter, HashRouter, Switch } from 'react-router-dom';
import AdminAnalytics from './pages/AdminAnalytics'
import AdminUserManagement from './pages/AdminUserManagement'
import {BrowserRouter as Link, Router, Route} from 'react-router-dom'
import Footer from './components/footer/Footer'
import SearchPage from './pages/SearchPage'
import GuestHome from './pages/GuestHome'
import SummaryPageCourse from './pages/SummaryPageCourse'
import SummaryPageAdviser from './pages/SummaryPageAdviser'
import SummaryPageAuthor from './pages/SummaryPageAuthor'
import { UserContext } from './components/user/UserContext';
import SearchContext from './components/search_results/SearchContext'
import HomePageRoute from './components/route/HomePageRoute';
import AdminPageProtectRoute from './components/route/AdminPageProtectRoute';
import AccessDocument from './pages/EditDocument'
import CreateDocument from './pages/CreateDocumentPage'
import CardEditingPage from './pages/CardEditingPage'
import AboutUs from './pages/AboutUs'
import EditCardsPage from './pages/EditCardsPage'
import { FileContext } from './components/manage_document/FileContext';
export const ACTIONS = {
  updateQuery: 'UPDATE_QUERY',
  updateCategory: 'UPDATE_CATEGORY',
  updateCourseCode: 'UPDATE_COURSE_CODE',
  updateTopic: 'UPDATE_TOPIC',
  reset: 'RESET'
}



function App() {
  const [loggedUser, setLoggedUser] = useState({});
  const [file, setFile] = useState('');
  //create what the value is
  const providerValue = useMemo(() => [{loggedUser, setLoggedUser}], [loggedUser, setLoggedUser])
   const providerValue2 = useMemo(() => [{file, setFile}], [file, setFile])
  /* FUNCTIONS AND STATES NEEDED TO HANDLE SEARCH FILTERS */
  const initialState = {
    query: '',
    category: [],
    courseCode: '',
    topic: [],
  };

  function handleCheck(checked, item){
    const index = checked.indexOf(item);
    const newChecked = [...checked];

    // if item not in checked list, add; else, remove
    if(index === -1){
      newChecked.push(item);
    }else{
      newChecked.splice(index, 1);
    } 
    return newChecked;
  }


    
    const reducer = (state, action) => {
      switch(action.type){
        case ACTIONS.updateQuery:
          console.log("in reducer update query");
          return { ...state, query: action.query};
        case ACTIONS.updateCategory:
          return { ...state, category: handleCheck(state.category, action.item) };

        case ACTIONS.updateCourseCode:
          return {...state, courseCode: action.item}

        case ACTIONS.updateTopic:
          return { ...state, topic: handleCheck(state.topic, action.item) };
          
        case ACTIONS.reset:
        return { initialState };

        default:
          return state;
      }
    }

  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="App"> 
          <SearchContext.Provider value={{ state: state, dispatch: dispatch }}>
      <BrowserRouter>
        <Switch>
          <UserContext.Provider value={{loggedUser, setLoggedUser}}>
            <Route exact path="/loggedIn/" component={GuestHome} />
            <Route exact path="/aboutUs" component={AboutUs} />
            <HomePageRoute exact path="/adminHome" component={AdminHome} />
            <AdminPageProtectRoute exact path="/adminHome/manageUsers" component={AdminUserManagement} />
            <AdminPageProtectRoute exact path="/adminHome/manageDocuments"  component={SearchPage} />
            <AdminPageProtectRoute exact path="/adminHome/manageAnnouncements"  component={EditCardsPage} />
            <AdminPageProtectRoute exact path="/adminHome/manageAnnouncements/:index" component={CardEditingPage} />
            <Route exact path="/search/:id"  component={AccessDocument} />
            <AdminPageProtectRoute exact path="/search/editDocument/:id"  component={AccessDocument} />
            <AdminPageProtectRoute exact path="/createDocument"  component={CreateDocument} />
            <AdminPageProtectRoute exact path="/adminHome/browseAnalytics" component={AdminAnalytics} />
            <AdminPageProtectRoute exact path="/adminHome/browseAnalytics/editFrontPage" component={EditCardsPage} />
            <AdminPageProtectRoute exact path="/adminHome/browseAnalytics/editFrontPage/editAdvisoryCard" component={CardEditingPage} />
            <Route exact path="/search" component={SearchPage} />            
            <Route exact path="/search/filter/:id" component={SearchPage} />
            <Route exact path="/courseSummary/:id" component={SummaryPageCourse} />
            <Route exact path="/adviserSummary/:name" component={SummaryPageAdviser} />
            <Route exact path="/authorSummary/:name" component={SummaryPageAuthor} />
            <Route exact path="/" component={GuestHome} />
          </UserContext.Provider>
        </Switch>
      </BrowserRouter>
      <Footer />
      </SearchContext.Provider>
    </div>
  )
}
export default App
