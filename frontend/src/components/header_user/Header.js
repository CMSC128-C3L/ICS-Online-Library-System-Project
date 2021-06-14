import '../header_user/Header.css'
import {useHistory} from 'react-router-dom'
import {useContext} from 'react'
import Button from '@material-ui/core/Button'
import Logout from '../login/Logout'
import { UserContext } from '../user/UserContext';
import Login from '../login/Login'
import icsLogo from '../../assets/ics_logo.png';
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
                    <Button className="Button" onClick={() => history.push('/support')}>Support</Button>
                </div>
            )
        }

        else{
            return(
                  <div className="Header-container-right" >
                    <Button className="Button">{data.given_name}</Button>
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
                    
                    {data.classification === 'Admin' ? <Button className="Button" onClick={() => history.push('/adminHome')}>Home</Button> : <Button className="Button" onClick={() => history.push('/')}>Home</Button>}
                    <Button className="Button" onClick={() => history.push('/search')}>Browse</Button>
                    <Button className="Button" onClick={() => history.push('/tools')}>Tools</Button>
                </div>
            
               {renderComponentsBasedOnState()}
                
            </div>
                     

        </div>
    )
}

export default Header