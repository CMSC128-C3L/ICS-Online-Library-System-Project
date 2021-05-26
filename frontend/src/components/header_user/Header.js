import '../header_user/Header.css'
import {useHistory} from 'react-router-dom'
import {useContext} from 'react'
import Button from '@material-ui/core/Button'
import Logout from '../login/Logout'
import { UserContext } from '../user/UserContext';
import Login from '../login/Login'

function Header({name}) {
    const history = useHistory();
    const {loggedUser, setLoggedUser} = useContext(UserContext)

    const renderComponentsBasedOnState = () =>{
        if(JSON.stringify(loggedUser) === '{}'){
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
                    <Button className="Button">{loggedUser.given_name}</Button>
                    <Logout/>
                </div>
            )
        }
    }
    return(
        <div>
            <div className="Logo-area">
                <div className="Logo">eyeCS</div>
            </div>
            <div className="Header-container">
                <div className="Header-container-left">
                    <Button className="Button" onClick={() => history.push('/adminHome')}>Home</Button>
                    <Button className="Button" onClick={() => history.push('/search')}>Browse</Button>
                    <Button className="Button" onClick={() => history.push('/tools')}>Tools</Button>
                </div>
            
               {renderComponentsBasedOnState()}
                
            </div>
                     

        </div>
    )
}

export default Header