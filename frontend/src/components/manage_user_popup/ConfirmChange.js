import React, {useEffect, useContext, useState} from 'react'
import { UserContext } from './Modal'
import TextField from '@material-ui/core/TextField';
import './styles.css'

const dec2hex = (dec) => {return dec.toString(16).padStart(2,"0")}
const generateKey = (length) => {
    var arr = new Uint8Array(length/2)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, dec2hex).join('')
}

function ConfirmChange(props){
    const {user} = useContext(UserContext)
    const [confirm, setConfirm] = useState({
        disable: true,
        key: ''
    })
    
    const handleInput = (e) => {
        e.preventDefault()
        if(e.target.value === confirm.key) setConfirm({...confirm, disable:false})
        else setConfirm({...confirm, disable:true})
    }

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
            <button className="save popup-btn" disabled={confirm.disable}>Confirm</button>
        </div>
    )
}

export default ConfirmChange
