import React, { forwardRef, useImperativeHandle, useState, useCallback } from 'react'
import ReactDOM from 'react-dom'
import './styles.css'

const portal = document.getElementById('portal')

function Modal({ children }, ref) {
    const [display, setDisplay] = useState(false)
    const close = useCallback(() => setDisplay(false), [])

    // Share open and close methods to parent DOM
    useImperativeHandle(ref, () => ({
        open: (user) => {
            setDisplay(true);
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
                    {children}
                </div>
            </div> : null,
        portal
    )
}

export default forwardRef(Modal)