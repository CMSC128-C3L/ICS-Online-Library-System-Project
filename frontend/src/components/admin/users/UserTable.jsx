import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableFooter, TablePagination, Avatar} from '@material-ui/core'
import './ManageUsers.css'
import UserTablePaginationActions from './UserTablePaginationActions'
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit';

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

const handleChangePage = (event, newPage) =>{
    setPage(newPage);
}

const handleChangeRowsPerPage = (event) =>{
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
}
    const getUsers = async() =>{
        try{
            const users = await axios.get("http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline");
            setUser(users.data)
            setRowCount(users.data.length)
        
        }catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    const filterRows = () =>{
       return (user.filter(person=>{

            //if search is blank, all items are considered
            if(search==""){
                return person
            
            //if search is not empty, filter contents accdg to search
            }else if(
            person.name.toLowerCase().includes(search.toLowerCase()) 
            || String(person.id).includes(search)
            || person.brand.toLowerCase().includes(search.toLowerCase()) 
            || person.product_type.toLowerCase().includes(search.toLowerCase())
            ){
                return person
            }
        }))

    }

    
    return (
        
        <div className="manageusers manageusers-container">
            <input className="searchbar" type="text" placeholder=" Search User" onChange={e=>{
                setSearch(e.target.value)
                setRowCount(filterRows().length)
            }}/>

           <div>
                <TableContainer component={Paper} className="usertable usertable-container">
                <Table aria-label="users">
                <TableHead>
                        <TableRow>
                            <TableCell align="center">Avatar</TableCell>
                            <TableCell align="center">ID</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Classification</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                </TableHead>
                <TableBody>
                    {filterRows().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(person=>{{
                            return (
                                <TableRow>
                                    <TableCell align="center" justify="center">
                                        <Avatar alt={person.name} src={person.image_link}></Avatar>
                                    </TableCell>
                                    <TableCell align="center">
                                        {person.id}
                                    </TableCell>
                                    <TableCell align="center">
                                        {person.name}
                                    </TableCell>
                                    <TableCell align="center">
                                        {person.brand}
                                    </TableCell>
                                    <TableCell align="center">
                                        {person.product_type}
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton aria-label="delete"><DeleteIcon/></IconButton>
                                        <IconButton aria-label="edit"><EditIcon/></IconButton>
                                    </TableCell>
                                </TableRow>

                            )
                    }}

                    )}
                    
                </TableBody>
                <TableFooter>
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
