import React, {createContext, forwardRef, useCallback, useEffect, useImperativeHandle, useState} from 'react'
import ReactDOM from 'react-dom'
import './styles.css'

const portal = document.getElementById('portal')
export const UserContext = createContext()

function Modal({ children }, ref){
    const [details, setDetails] = useState({
        user: {},
        display: false,
        closeModal: null
    })
    const close = useCallback((details) => setDetails({...details, display:false}), [])
    
    // Share open and close methods to parent DOM
    useImperativeHandle(ref, (details) => ({
        open: (user) => {
            setDetails({
                ...details,
                user: user,
                display: true,
                closeModal: close,
            })
        },
        close
    }), [close])

    // Press ESC to close modal and disable scrolling when modal is opened
    useEffect(() => {
        const closeOnESC = (e) => {
            if(e.key === 'Escape')
                setDetails(details => {
                    return {...details, display:false}
                })
        }
        
        window.addEventListener('keydown', closeOnESC)
        document.body.style.overflow = details.display? 'hidden' : 'unset'
    }, [details.display])


    // Show modal if display === true, else show null
    return ReactDOM.createPortal(
        details.display?
            <div className="modal-wrapper">
                <div className="modal-backdrop"/>
                <div className="modal-box">
                    <button id="close-button" onClick={close}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><defs/><path d="M23 20.168l-8.185-8.187L23 3.807 20.168 1l-8.182 8.179L3.81 1 1 3.81l8.186 8.196L1 20.19 3.81 23l8.203-8.192L20.193 23z"/></svg>
                    </button>
                    
                    <UserContext.Provider value={{
                        user:details.user,
                        close:details.closeModal
                    }}>
                        {children}
                    </UserContext.Provider>
                </div>
            </div> : null,
        portal
    )
}

export default forwardRef(Modal)