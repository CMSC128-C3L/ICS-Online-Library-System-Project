import React, {useState} from 'react'

function EditUser(props){
    const [user, setUser] = useState(null)
    console.log(props.ref)
    return(
        <div>
            <h1>Edit user here</h1>
        </div>
    )
}

export default EditUser