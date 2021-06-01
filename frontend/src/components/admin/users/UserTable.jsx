import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import {Table, TableBody, TableCell, TableContainer, TableRow, Paper, TableFooter, TablePagination, Avatar, Checkbox, Toolbar, Typography, Icon} from '@material-ui/core'
import {lighten, makeStyles} from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
// import UserToolbar from './UserToolbar'
import {getComparator, stableSort} from './Comparator'
import UserTablePaginationActions from './UserTablePaginationActions'
import Modal from '../../manage_user_popup/Modal'
import EditUser from '../../manage_user_popup/EditUser'
import DeleteUser from '../../manage_user_popup/DeleteUser'
import MultiDeleteUser from './MultiDeleteUser'
import UserTableHeadMS from './UserTableHeadMS'
import './ManageUsers.css'

const useStyles = makeStyles((theme) => ({
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    heading: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 700,
        fontSize: '1.5em',
        textAlign: 'center',
        color: 'white',
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
}));

function UserTable(records, headCells) {
    const [rows, setRows] = useState([]) //initialize collection of user data to an empty array
    const [search, setSearch] = useState("") //initialize search to blank

    const classes = useStyles();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name')
    const [selected, setSelected] = useState([])
    const [page, setPage] = useState(0) //initialize table page to page 0
    const [rowsPerPage, setRowsPerPage] = useState(5) //initialize rows per page to 5
    const [rowCount, setRowCount] = useState(0) //get number of filtered rows

    const handleChangePage = (event, newPage) =>{
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) =>{
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }
    
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleSelectAllClick = (e) => {
        if(e.target.checked) {
            const newSelecteds = rows.map((n) => n._id)
            setSelected(newSelecteds)
            return;
        }
        setSelected([]);
    }

    const handleClick = (e, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = []

        if(selectedIndex === -1)
            newSelected = newSelected.concat(selected, id)
        else if(selectedIndex === 0)
            newSelected = newSelected.concat(selected.slice(1))
        else if(selectedIndex === selected.length - 1)
            newSelected = newSelected.concat(selected.slice(0, -1))
        else if(selectedIndex > 0)
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))

        setSelected(newSelected)
    }

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const getUsers = async() =>{
        try{
            let options =  {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}, }
            let rows = await axios.get("/api/users", options)
            console.log(rows.data)
            setRows(rows.data)
            setRowCount(rows.data.length)
        
        }catch(e){console.log(e)}
    }

    useEffect(() => {
        getUsers()
    }, [])

    // just re-render UserTable component upon successful update and delete user
    useEffect(() => {   }, [rows])

    const filterRows = () => {
       return (rows.filter(person=>{

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

    const createClassificationCell = (classification) => {
        let containerColor

        // admin -> red
        // staff or faculty -> purple
        // student -> sky blue
        if(classification === "Admin") containerColor = "#d01b1b"
        else if(classification === "Staff" || classification === "Faculty") containerColor = "#b19cd8"
        else containerColor = "#47abd8"

        return(
            <span style={{display:'inline-block', width: '50%'}}>
                <p className="classification-fontstyle" style={{backgroundColor: containerColor, borderRadius: "200px", padding: "1em 0.5em"}}>{classification}</p>
            </span>
        )
    }

    // Create reference to modal
    const editModal = useRef(null)
    const deleteModal = useRef(null)
    const multiDeleteModal = useRef(null)
    const openEditModal = (user) => {editModal.current.open(user)}
    const openDeleteModal = (user) => {deleteModal.current.open(user)}
    const openMultiDeleteModal = (users) => {multiDeleteModal.current.open(users)}

    return (
        <div className="manageusers manageusers-container">
            <div>
                <Modal ref={editModal}><EditUser getUsers={getUsers}/></Modal>
                <Modal ref={deleteModal}><DeleteUser getUsers={getUsers}/></Modal>
                <Modal ref={multiDeleteModal}><MultiDeleteUser getUsers={getUsers}/></Modal>
                
                <Toolbar style={{display: 'block'}}>
                    <input className="searchbar" type="text" placeholder=" Search User" onChange={e=>{
                        setSearch(e.target.value)
                        setRowCount(filterRows().length)
                        setPage(0)
                    }}/>

                    <div className='toolbar-position'>
                        <div className='toolbar'>
                            {selected.length > 0 ? (
                                <>
                                <Typography color='secondary'>{selected.length} selected</Typography>
                                <button
                                    className="toolbar-delete"
                                    onClick={() => openMultiDeleteModal(selected)}>
                                    <DeleteIcon color='secondary'/>
                                </button>
                                </>
                            ) : (
                                <>
                                </>
                            )}
                        </div>
                    </div>
                </Toolbar>

                <TableContainer component={Paper} className="usertable usertable-container">
                    <Table aria-label="users"> 
                        <UserTableHeadMS
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(filterRows(), getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((person, index) => {
                                const isItemSelected = isSelected(person._id)
                                const labelId = `enhanced-table-checkbox-${index}`

                                return (
                                    <TableRow
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={person._id}
                                        selected={isItemSelected}
                                        component="th"
                                    >

                                        <TableCell padding="checkbox">
                                            <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, person._id)} inputProps={{'aria-labelledby':labelId}}/>
                                        </TableCell>
                                        
                                        <TableCell align="center" padding="none">
                                            <span style={{display:'inline-block'}}><Avatar alt={person.name} src={person.avatar}></Avatar></span>
                                        </TableCell>
                                        <TableCell align="center" padding="none">{person.id}</TableCell>
                                        <TableCell id={labelId} padding="none" align="center">{person.name}</TableCell>
                                        <TableCell align="center" padding="none">{person.email}</TableCell>
                                        <TableCell align="center" padding="none">{createClassificationCell(person.classification)}</TableCell>
                                        <TableCell align="center" padding="none">
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
                            <TableRow align="center" component="th">
                            <TablePagination
                                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                        colSpan={7}
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