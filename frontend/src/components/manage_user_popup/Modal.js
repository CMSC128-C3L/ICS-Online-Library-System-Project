import React, {createContext, forwardRef, useCallback, useImperativeHandle, useState} from 'react'
import ReactDOM from 'react-dom'
import './styles.css'

const portal = document.getElementById('portal')
export const UserContext = createContext()

function Modal({ children }, ref){
    var [user, setUser] = useState({})
    const [display, setDisplay] = useState(false)
    const close = useCallback(() => setDisplay(false), [])

    // Share open and close methods to parent DOM
    useImperativeHandle(ref, () => ({
        open: (user) => {
            setDisplay(true);
            setUser(user);
        },
        close
    }), [close])

    // Show modal if display === true, else show null
    return ReactDOM.createPortal(
        display?
            <div className="modal-wrapper">
                <div className="modal-backdrop"/>
                <div className="modal-box">
                    <button id="close-button" onClick={close}>X</button>
                    
                    <UserContext.Provider value={user}>
                        {children}
                    </UserContext.Provider>
                </div>
            </div> : null,
        portal
    )
}

export default forwardRef(Modal)