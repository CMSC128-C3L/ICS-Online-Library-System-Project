import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableFooter, TablePagination, Avatar} from '@material-ui/core'
import './ManageUsers.css'
import UserTablePaginationActions from './UserTablePaginationActions'
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit';
import ArrowUpward from '@material-ui/icons/ArrowUpward'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import Modal from '../../manage_user_popup/Modal'
import EditUser from '../../manage_user_popup/EditUser'
import DeleteUser from '../../manage_user_popup/DeleteUser'
import decode from 'jwt-decode'

function UserTable(records, headCells) {

//initialize collection of user data to an empty array
const [user, setUser] = useState([])

//initialize search to blank
const [search, setSearch] = useState("")

//initialize table page to page 0
const [page, setPage] = useState(0)

//initialize rows per page to 5
const [rowsPerPage, setRowsPerPage] = useState(5)

//get number of filtered rows
const [rowCount, setRowCount] = useState(0)

/* 
    Sort Type
    ascending = 1
    descending = -1
*/
const [sortType, setSortType] = useState(1)

const handleChangePage = (event, newPage) =>{
    setPage(newPage);
}

const handleChangeRowsPerPage = (event) =>{
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
}
    let users = []
    const getUsers = async() =>{
        try{
            let options =  {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}, }
            users = await axios.get("/api/users", options)
            console.log(users.data)
            setUser(users.data)
            setRowCount(users.data.length)
        
        }catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    // just re-render UserTable component upon successful update and delete user
    useEffect(() => {   }, [users])

    const filterRows = () =>{
       return (user.filter(person=>{

            //if search is blank, all items are considered
            if(search===""){
                return person
            
            //if search is not empty, filter contents accdg to search
            }else if(
            person.name.toLowerCase().includes(search.toLowerCase()) 
            || String(person.id).includes(search)
            || person.name.toLowerCase().includes(search.toLowerCase())
            || person.email.toLowerCase().includes(search.toLowerCase()) 
            || person.classification.toLowerCase().includes(search.toLowerCase())
            ){
                return person
            }
        }))

    }


    const sortRows = (array) =>{
    array.sort((a, b) => {
            if (a.name > b.name) {
                if(sortType === 1) return 1;
                else return -1;
            }

            if (a.name < b.name) {
                if(sortType === 1) return -1;
                else return 1;
            }
            return 0;
          
        });
    }

    const createClassificationCell = (classification) => {

        //if admin, set background color to red 
        //NOTE: remove classfication 1, used for demonstrative purposes only
        if(classification === "classification 1" || classification === "classification 1"){
            return(
                <span style={{width: "7em", height: "3em", backgroundColor: "#d01b1b", border: "1px #d01b1b solid", borderRadius: "200px", display: "inline-block", justifyContent: "center", padding: "0.5em"}}><p className="classification-fontstyle">{classification}</p></span>
            )
        }else if(classification === "Staff" || classification === "Faculty" || classification === "classification 2"){
            //if faculty or staff, set background color to purple 
            //NOTE: remove classfication 2, used for demonstrative purposes only
            
            return(
                <span style={{width: "7em", height: "3em", backgroundColor: "#b19cd8", border: "1px #b19cd8 solid", borderRadius: "200px", display: "inline-block", justifyContent: "center", padding: "0.5em"}}><p className="classification-fontstyle">{classification}</p></span>
            )
        }else{
            return(
                //if student, set background color to sky blue
                <span style={{width: "7em", height: "3em", backgroundColor: "#47abd8", border: "1px #47abd8 solid", borderRadius: "200px", display: "inline-block", justifyContent: "center", padding: "0.5em"}}><p className="classification-fontstyle">{classification}</p></span>
            )
        }
    }

    // Create reference to modal
    const editModal = useRef(null)
    const deleteModal = useRef(null)
    const openEditModal = (user) => {editModal.current.open(user)}
    const openDeleteModal = (user) => {deleteModal.current.open(user)}
    
    return (
        <div className="manageusers manageusers-container">
            <input className="searchbar" type="text" placeholder=" Search User" onChange={e=>{
                setSearch(e.target.value)
                setRowCount(filterRows().length)
                setPage(0)
            }}/>

          
            <div>
                <Modal ref={editModal}><EditUser getUsers={getUsers}/></Modal>
                <Modal ref={deleteModal}><DeleteUser getUsers={getUsers}/></Modal>

                <TableContainer component={Paper} className="usertable usertable-container">
                <Table aria-label="users" > 
                <TableHead>
                        <TableRow align="center" justifyContent="center" style={{backgroundColor: "#47abd8"}}>
                            <TableCell align="center"><h2 className="table-heading">Avatar</h2></TableCell>
                            <TableCell align="center"><h2 className="table-heading">ID</h2></TableCell>
                            <TableCell align="center">
                                <span style={{display: "inline-flex"}}><IconButton onClick={() => {setSortType(-1 * sortType); sortRows(user); }}>{(sortType === 1) ? <ArrowUpward className="arrow-button"/> : <ArrowDownward className="arrow-button"/>}</IconButton>
                                <h2 className="table-heading">Name</h2></span>
                            </TableCell>
                            <TableCell align="center"><h2 className="table-heading">Email</h2></TableCell>
                            <TableCell align="center"><h2 className="table-heading">Classification</h2></TableCell>
                            <TableCell align="center"><h2 className="table-heading">Actions</h2></TableCell>
                        </TableRow>
                </TableHead>
                <TableBody>
                    {filterRows().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(person=>{
                            return (
                                <TableRow justifyContent="center">
                                    <TableCell align="center">
                                        <span style={{maxWidth: "10%", maxHeight: "10%", display: "inline-block"}}> <Avatar alt={person.name} src={person.avatar} align="center"></Avatar></span>
                                    </TableCell>
                                    <TableCell align="center" style={{maxWidth: "30%"}}>
                                        {person.id} 
                                    </TableCell>
                                    <TableCell align="center">
                                        {person.name}
                                    </TableCell>
                                    <TableCell align="center">
                                        {person.email}
                                    </TableCell>
                                    <TableCell align="center">
                                        {createClassificationCell(person.classification)}
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            aria-label="delete"
                                            className="iconbutton-view"
                                            onClick={() => openDeleteModal(person)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                        
                                        <IconButton
                                            aria-label="edit"
                                            className="iconbutton-view"
                                            onClick={() => openEditModal(person)}>
                                            <EditIcon/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>

                            )
                    }

                    )}
                    
                </TableBody>
                <TableFooter align="center">
                    <TableRow align="center">
                       <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={3}
                                count={rowCount}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page' },
                                    native: true,
                                }}
                                
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                ActionsComponent={UserTablePaginationActions}
                            />
                        </TableRow>
                </TableFooter>
                </Table>
                </TableContainer>
          </div>
        </div>
    )
}

export default UserTable