import './Header.css'
import {useHistory} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Login from '../login/Login'

function Header() {
    const history = useHistory();
    return(
        <div>
            <div className="Logo-area">
                <div className="Logo">eyeCS</div>
            </div>
            <div className="Header-container">
                <div className="Header-container-left">
                    <Button className="Button" onClick={() => history.push('/')}>Home</Button>
                    <Button className="Button" onClick={() => history.push('/search')}>Browse</Button>
                    <Button className="Button" onClick={() => history.push('/tools')}>Tools</Button>
                </div>
            
                <div className="Header-container-right" >
                    <Login/>
                    <Button className="Button" onClick={() => history.push('/support')}>Support</Button>
                </div>  
            </div>
                     

        </div>
    )
}

export default Header