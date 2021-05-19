import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Table, TableBody, TableCell, TableRow} from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save';
import GetAppIcon from '@material-ui/icons/GetApp';
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit';

function UserTable() {
const [document, setDocument] = useState([])

    const getDocument = async() =>{
        try{
            const documents = await axios.get("http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline");
            setDocument(documents.data)
        }catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        getDocument()
    }, [])

    const chosenDocument = () =>{
       return (document.filter(document=>{
                return document
        }))

    }

    return (
           <div className = "document-card">
                {
                <Table aria-label="documents">
                    <TableBody>
                        {chosenDocument().map(document=>{{
                            return (
                                <TableRow>
                                    <TableCell align="center" justify="center">
                                        <img src={document.image_link}></img>
                                    </TableCell>
                                    <TableCell align="center">
                                        {document.id}
                                        {document.name}
                                        {document.brand}
                                        {document.product_type}
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton aria-label="download"><GetAppIcon/></IconButton>
                                        <IconButton aria-label="edit"><EditIcon/></IconButton>
                                        <IconButton aria-label="save"><SaveIcon/></IconButton>
                                    </TableCell>
                                </TableRow>
                            )
                        }}
                        )}
                    </TableBody>
                </Table>
                }
           </div>
    )
}

export default UserTable