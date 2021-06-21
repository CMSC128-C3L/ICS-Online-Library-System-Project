import '../header_user/Header.css'
import {useHistory} from 'react-router-dom'
import {useContext} from 'react'
import Button from '@material-ui/core/Button'
import SearchContext from '../search_results/SearchContext'
import Logout from '../login/Logout'
import { UserContext } from '../user/UserContext';
import Login from '../login/Login'
import icsLogo from '../../assets/ics_logo.png';
import decode from 'jwt-decode';
export const ACTIONS = {
    updateQuery: 'UPDATE_QUERY',
    updateCategory: 'UPDATE_CATEGORY',
    updateCourseCode: 'UPDATE_COURSE_CODE',
    updateTopic: 'UPDATE_TOPIC',
    reset: 'RESET',
    reset2: 'RESET2'
}
  
  function Header({name}) {
      const history = useHistory();
      const {loggedUser, setLoggedUser} = useContext(UserContext)
      const searchContext = useContext(SearchContext);
      const resetChange = () => (
            console.log(searchContext.state.category),
            searchContext.dispatch({ type: ACTIONS.reset2 }),
            history.push('/')
      )
    const data = (localStorage.length != 0) ? decode(localStorage.getItem('token')) : '{}'
    const renderComponentsBasedOnState = () =>{
        if(data === '{}'){
            return(
                <div className="Header-container-right" >
                    <Login/>
                </div>
            )
        }
        else{
            return(
                  <div className="Header-container-right" >
                    <Button className="Button" disabled>{data.given_name}</Button>
                    <Logout/>
                </div>
            )
        }
    }
    return(
        <div>
            <div className="Logo-area">
                <div className="Logo">
                <img src={icsLogo} alt="logo" className="ics_icon"/> 
                EyeCS: Window to Knowledge
                </div>
            </div>
            <div className="Header-container">
                <div className="Header-container-left">
                    
                    {data.classification === 'Admin' ? <Button className="Button" onClick={() => history.push('/adminHome')}>Home</Button> : <Button className="Button" onClick={() => {resetChange()}}>Home</Button>}
                    <Button className="Button" onClick={() => history.push('/search')}>Browse</Button>
                   
                </div>
            
               {renderComponentsBasedOnState()}
                
            </div>
                    
        </div>
    )
}

export default Header