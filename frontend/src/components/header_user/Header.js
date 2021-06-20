import '../header_user/Header.css'
import {useHistory} from 'react-router-dom'
import {useContext} from 'react'
import Button from '@material-ui/core/Button'
import Logout from '../login/Logout'
import { UserContext } from '../user/UserContext';
import Login from '../login/Login'
import icsLogo from '../../assets/ICS_Logo_Minimal.png';
import decode from 'jwt-decode';

function Header({name}) {
    const history = useHistory();
    const {loggedUser, setLoggedUser} = useContext(UserContext)
    const data = (localStorage.length != 0) ? decode(localStorage.getItem('token')) : '{}'
    console.log(data)
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
                    <Button className="Button" disabled><p class = "p2">{data.given_name}</p></Button>
                    <Logout/>
                </div>
            )
        }
    }
    return(
        <div className="Header-container">
            <div className="Header-container-left">
                <img src={icsLogo} alt="logo" className="ics_icon"/> 
                {data.classification === 'Admin' ? <Button className="Button-current-page" onClick={() => history.push('/adminHome')}><p class = "p1">Home</p></Button> : <Button className="Button-current-page" onClick={() => history.push('/')}><p class = "p1">Home</p></Button>}
                <Button className="Button" onClick={() => history.push('/search')}><p class = "p2">Browse</p></Button>
            </div>
        
        {renderComponentsBasedOnState()}
            
        </div>
    )
}

export default Header