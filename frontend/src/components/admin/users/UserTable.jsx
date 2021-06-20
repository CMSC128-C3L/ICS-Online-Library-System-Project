import React, {useCallback, useState, useEffect, useRef, useContext} from 'react'
import axios from 'axios'
import {Table, TableBody, TableCell, TableContainer, TableRow, Paper, TableFooter, TablePagination, Avatar, Checkbox, Toolbar, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete';
import SyncIcon from '@material-ui/icons/Sync';
import EditIcon from '@material-ui/icons/Edit';
import ViewListIcon from '@material-ui/icons/ViewList'
import {getComparator, stableSort, formatDateObject} from '../../helpers/Helpers'
import UserTablePaginationActions from './UserTablePaginationActions'
import Modal from '../../manage_user_popup/Modal'
import EditUser from '../../manage_user_popup/EditUser'
import DeleteUser from '../../manage_user_popup/DeleteUser'
import MultiDeleteUser from './MultiDeleteUser'
import UserTableHeadMS from './UserTableHeadMS'
import './ManageUsers.css'
import decode from 'jwt-decode';

const useStyles = makeStyles((theme) => ({
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
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

function UserTable(props) {
    const [rows, setRows] = useState([]) //initialize collection of user data to an empty array
    const [search, setSearch] = useState("") //initialize search to blank
    const currentUser = decode(localStorage.getItem('token'))

    const classes = useStyles();
    const [order, setOrder] = useState('desc'); //default sort order is ascending
    const [orderBy, setOrderBy] = useState('last_login') //default sorted column is name
    const [selected, setSelected] = useState([]) //default selected list empty, key for TableRow
    const [page, setPage] = useState(0) //initialize table page to page 0
    const [rowsPerPage, setRowsPerPage] = useState(5) //initialize rows per page to 5
    const [rowCount, setRowCount] = useState(0) //get number of filtered rows

    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

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
        setPage(0)
    }

    const handleSelectAllClick = (e) => {
        if(e.target.checked) {
            const newSelecteds = rows.map((n) => n._id)
            setSelected(newSelecteds)
            return;
        }
        setSelected([]);
    }

    const handleClick = (e, person) => {
        const selectedIndex = selected.indexOf(person._id);
        let newSelected = []

        if(selectedIndex === -1)
            newSelected = newSelected.concat(selected, person._id)
        else if(selectedIndex === 0)
            newSelected = newSelected.concat(selected.slice(1))
        else if(selectedIndex === selected.length - 1)
            newSelected = newSelected.concat(selected.slice(0, -1))
        else if(selectedIndex > 0)
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))

        setSelected(newSelected)
    }

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const getLogs = async() =>{
        try{
            let options = {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}, }

            const res = await axios.get(`/api/log/`, options)
            return res.data

        }catch(e){console.log(e)}
    }

    // Return latest login
    const getLastLogin = (log) => {
        return new Date(log.log_date.slice(-1)[0].login)
    }

    // Return latest logout
    const getLastLogout = (log) => {
        const reversedLogs = log.log_date.slice().reverse()
        const index = reversedLogs.findIndex(date => date.logout !== undefined)
        return index !==-1 ? new Date(reversedLogs[index].logout) : ""
    }

    // Add latest login as property to filtered user objects
    const joinUserLogs = (users, logs) => {
        users.forEach((user) => {
            const index = logs.findIndex(log => log.user_id === user._id)
            
            user.last_login = index !== -1 ? getLastLogin(logs[index]) : ""
            user.last_logout = index !== -1 ? getLastLogout(logs[index]) : ""
            user.view_count = index !== -1 ? logs[index].doc_count : ""
            user.view_doc_logs = index !== -1 ? logs[index].doc_logs : []
        })

        console.log(logs)
    }

    const getUsers = async() =>{
        let users = []
        try{
            let options =  {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}, }
            users = await axios.get("/api/users", options)
            
            const filteredRows = filterRows(users.data)
            const logs = await getLogs()
            joinUserLogs(filteredRows, logs)
            setRows(filteredRows)
            setRowCount(filteredRows.length)
        }catch(e){console.log(e)}
    }

    const filterRows = useCallback(
        (user) => {
            const currentUserName = currentUser.given_name.concat(' ',currentUser.family_name)
            
            return (user.filter( person => {
                return(
                    (
                        // Filter search query
                        search === ""
                        || person.name.toLowerCase().includes(search.toLowerCase()) 
                        || String(person.id).includes(search)
                        || person.name.toLowerCase().includes(search.toLowerCase())
                        || person.email.toLowerCase().includes(search.toLowerCase()) 
                        || person.classification.toLowerCase().includes(search.toLowerCase())
                    )
                    &&  
                        // Filter current user
                        currentUserName.toLowerCase() !== person.name.toLowerCase()
                )
            }))
    }, [currentUser.family_name, currentUser.given_name, search])

    // Fetch users on first render
    useEffect(() => {
        getUsers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Update row count on query change
    useEffect(() => {
        setRowCount(filterRows(rows).length)
        setPage(0)
        // eslint-disable-next-line react-hooks/exhaustive-deps        
    }, [search])

    // Update row count on rows change
    useEffect(() => {
        setRowCount(filterRows(rows).length)
        setPage(0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rows])

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const createClassificationCell = (classification) => {
        let containerColor

        // admin -> red
        // staff or faculty -> purple
        // student -> sky blue
        if(classification === "Admin") containerColor = "#d01b1b"
        else if(classification === "Staff" || classification === "Faculty") containerColor = "#b19cd8"
        else containerColor = "#47abd8"

        return(
            <span style={{display:'inline-block', width: '70%'}}>
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
            
                <Modal ref={editModal}><EditUser getUsers={getUsers}/></Modal>
                <Modal ref={deleteModal}><DeleteUser getUsers={getUsers}/></Modal>
                <Modal ref={multiDeleteModal}><MultiDeleteUser getUsers={getUsers} resetSelected={() => setSelected([])}/></Modal>
                
                <Toolbar className="toolbar">
                    <input className="searchbar"
                           type="text"
                           placeholder=" Search User"
                           onChange={ (e) => {
                                handleSearch(e)
                            }}
                            value={search}
                    />

                    <div className='toolbar-position'>
                        <div className='toolbar-tools'>
                            {selected.length > 0 ? (
                                <>
                                <Typography color='secondary'>{selected.length} selected</Typography>
                                <button
                                    className="toolbar-btn"
                                    onClick={() => openMultiDeleteModal(selected)}>
                                    <DeleteIcon color='secondary'/>
                                </button>
                                </>
                            ) : (
                                <>
                                <Typography color='primary'>Reload Users</Typography>
                                <button
                                    className="toolbar-btn"
                                    onClick={() => getUsers()}>
                                    <SyncIcon color='primary'/>
                                </button>
                                </>
                            )}
                        </div>
                    </div>
                </Toolbar>

                <TableContainer component={Paper} className="usertable usertable-container">
                    <Table aria-label="users" size="medium"> 
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
                            {stableSort(filterRows(rows), getComparator(order, orderBy))
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
                                    >

                                        <TableCell padding="checkbox" width="5%">
                                            <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, person)} inputProps={{'aria-labelledby':labelId}}/>
                                        </TableCell>
                                        
                                        <TableCell align="center">
                                            <span style={{display:'inline-block'}}><Avatar alt={person.name} src={person.profile_picture}></Avatar></span>
                                        </TableCell>
                                        <TableCell id={labelId} align="left">{person.name}</TableCell>
                                        <TableCell align="left">{person.email}</TableCell>
                                        <TableCell align="left">{formatDateObject(person.last_login)}</TableCell>
                                        <TableCell align="left">{formatDateObject(person.last_logout)}</TableCell>
                                        <TableCell align="center">{person.view_count}</TableCell>
                                        <TableCell align="center">{createClassificationCell(person.classification)}</TableCell>
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

                            {emptyRows > 0 && (
                                <TableRow style={{ height: 109 * emptyRows }}>
                                    <TableCell colSpan={8} />
                                </TableRow>
                            )}
                            
                        </TableBody>
                        <TableFooter align="center">
                            <TableRow align="center">
                            <TablePagination
                                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                        colSpan={9}
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
    )
}

export default UserTable