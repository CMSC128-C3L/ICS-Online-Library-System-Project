import React, { forwardRef, useImperativeHandle, useState, useCallback } from 'react'
import ReactDOM from 'react-dom'
import './styles.css'

const portal = document.getElementById('portal')

function Modal({ children }, ref) {
    const [display, setDisplay] = useState(false)
    const close = useCallback(() => setDisplay(false), [])

    useImperativeHandle(ref, () => ({
        open: () => setDisplay(true),
        close
    }), [close])

    return ReactDOM.createPortal(
        display?
            <div className="modal-container">
                <div className="modal-backdrop"/>
                <div className="modal-box">
                    <button onClick={close}>X</button>
                    {children}
                </div>
            </div> : null,
        portal
    )
}

export default forwardRef(Modal)