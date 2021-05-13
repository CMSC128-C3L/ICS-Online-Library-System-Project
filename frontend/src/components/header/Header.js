import './Header.css'

function Header() {
    return(
        <div>
            <div className="Logo-area">
                <div className="Logo">iLib Logo/Name</div>
            </div>
            
            <div className="Header-container-left">
                <a className="Header-links" style={{color: 'black'}} href="test">Home</a>
                <a className="Header-links" style={{color: 'black'}} href="test">Browse</a>
                <a className="Header-links" style={{color: 'black'}} href="test">Tools</a>
            </div>
            
            <div className="Header-container-right" >
                <a className="Header-links" style={{color: 'black'}} href="test">Name</a>
                <a className="Header-links" style={{color: 'black'}} href="test">Support</a>
            </div>           

        </div>
    )
}

export default Header