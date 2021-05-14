import './Header.css'
import {useHistory} from 'react-router-dom'
import Button from '@material-ui/core/Button'
function Header() {
    const history = useHistory();
    return(
        <div>
            <div className="Logo-area">
                <div className="Logo">eyeCS</div>
            </div>
            <div className="Header-container">
                <div className="Header-container-left">
                    <Button className="Button" onClick={() => history.push('/test')}>Home</Button>
                    <Button className="Button" onClick={() => history.push('/test')}>Browse</Button>
                    <Button className="Button" onClick={() => history.push('/test')}>Tools</Button>
                </div>
            
                <div className="Header-container-right" >
                    <Button className="Button" onClick={() => history.push('/test')}>Name</Button>
                    <Button className="Button" onClick={() => history.push('/test')}>Support</Button>
                </div>  
            </div>
                     

        </div>
    )
}

export default Header