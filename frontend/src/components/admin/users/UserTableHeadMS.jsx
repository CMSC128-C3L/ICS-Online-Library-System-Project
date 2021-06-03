import React from 'react'
import {Checkbox, TableHead, TableRow, TableCell, TableSortLabel} from '@material-ui/core'
import './ManageUsers.css'

const headCells = [
    { id: 'avatar', sortable: false, disablePadding: false, label: 'Avatar' },
    { id: 'id', sortable: true, disablePadding: false, label: 'ID' },
    { id: 'name', sortable: true, disablePadding: false, label: 'Name' },
    { id: 'email', sortable: true, disablePadding: false, label: 'Email' },
    { id: 'classification', sortable: false, disablePadding: false, label: 'Classification' },
    { id: 'actions', sortable: false, disablePadding: false, label: 'Actions' }
]

function UserTableHeadMS(props){
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    }

    return (
        <TableHead>
            <TableRow style={{backgroundColor: '#47abd8'}} component="th">
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
                        align={'center'}
                        // padding={headCell.disablePadding? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            hideSortIcon={!headCell.sortable}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                            classes={{
                                // root: classes.heading,
                                // active: classes.heading,
                            }}
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