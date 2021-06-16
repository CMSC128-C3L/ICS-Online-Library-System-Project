import React from 'react'
import {Checkbox, TableHead, TableRow, TableCell, TableSortLabel} from '@material-ui/core'
import './ManageUsers.css'

const headCells = [
    { id: 'avatar', sortable: false, align: 'center', disablePadding: false, label: 'Avatar' },
    { id: 'name', sortable: true, align: 'left', disablePadding: false, label: 'Name' },
    { id: 'email', sortable: true, align: 'left', disablePadding: false, label: 'Email' },
    { id: 'last_login', sortable: true, align: 'left', disablePadding: false, label: 'Last Logged In' },
    { id: 'last_logout', sortable: true, align: 'left', disablePadding: false, label: 'Last Logged Out' },
    { id: 'classification', sortable: false, align: 'center', disablePadding: false, label: 'Classification' },
    { id: 'actions', sortable: false, align: 'center', disablePadding: false, label: 'Actions' }
]

function UserTableHeadMS(props){
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    }

    return (
        <TableHead>
            <TableRow style={{backgroundColor: '#47abd8', border: 'none'}}>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{'aria-label': 'select all users'}}
                    />
                </TableCell>

                {headCells.map((headCell) =>(
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        sortDirection={orderBy === headCell.id? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            hideSortIcon={!headCell.sortable}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

export default UserTableHeadMS