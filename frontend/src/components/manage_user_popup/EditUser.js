import React, { useContext, useState } from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import { UserContext } from './Modal'
import './styles.css'

// Edit User UI, user state is from parent Modal
function EditUser({ children }){
    const {user} = useContext(UserContext);
    const origClassif = user.classification;
    const [currClassif, setClassif] = useState(origClassif);

    const handleChange = (event) => {
        setClassif(event.target.value)
    }
    
    const handleSave = () =>{
        if (origClassif !== currClassif){           
            // something has changed and must update db
        }
    }

    return(
        <div className="edit-user popup-container">
            <img className="user-avatar" alt={user.name} src={user.avatar}/>
            <h3 className="text regular user-id">{user.id}</h3>
            <h2 className="text user-name">{user.name}</h2>
            <h4 className=" text regular user-email">{user.email}</h4>
            <FormControl variant="filled" style={{height:'50px'}}>
                <InputLabel htmlFor="filled-classif-native-simple">Classification</InputLabel>
                <Select
                native
                value={currClassif}
                onChange={handleChange}
                >
                <option aria-label="Current" value={currClassif}>{currClassif.toUpperCase()}</option>
                {/* {["Admin", "Faculty", "Staff", "Student"].map((classification) => { */}
                {["classification 1", "classification 2", "classification 3", "classification 4"].map((classif) => {
                    return(
                        classif !== currClassif? 
                        <option key={classif} value={classif}>{classif.toUpperCase()}</option> :
                        null
                    )
                })}
                </Select>
            </FormControl>
            <button className="save popup-btn" onClick={handleSave}>Save Changes</button>
        </div>
    )
}

export default EditUser