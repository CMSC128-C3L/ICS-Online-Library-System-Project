import React, {useEffect, useContext, useState} from 'react'
import { UserContext } from './Modal'
import TextField from '@material-ui/core/TextField';
import './styles.css'

// Functions to generate random string
const dec2hex = (dec) => {return dec.toString(16).padStart(2,"0")}
const generateKey = (length) => {
    var arr = new Uint8Array(length/2)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, dec2hex).join('')
}

function ConfirmChange(props){
    const {user, close} = useContext(UserContext)
    const [confirm, setConfirm] = useState({
        disable: true,
        key: ''
    })
    
    // Enables button if input === key
    const handleInput = (e) => {
        e.preventDefault()
        if(e.target.value === confirm.key) setConfirm({...confirm, disable:false})
        else setConfirm({...confirm, disable:true})
    }

    // Sets 'confirmed' state of parent modal to true
    const handleConfirmation = (e) => {
        e.preventDefault()
        props.onConfirm(true)
        close()
    }

    // Generate key on first render
    useEffect(() => {
        setConfirm({...confirm, key:generateKey(10)})
    }, [])

    return(
        <div className="confirm-change popup-container">
            <h4 className="text">Type text below to continue</h4>
            <div className="copy-disable key-container text">
                <h1>{confirm.key}</h1>
            </div>
            <TextField id="key-input" placeholder="Type here" variant="outlined" onChange={handleInput}/>
            <button className="save popup-btn" disabled={confirm.disable} onClick={handleConfirmation}>Confirm</button>
        </div>
    )
}

export default ConfirmChange
