import React from 'react'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import {makeStyles, ThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
// const useStyles = makeStyles({
//     root: {
//         background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//         borderRadius: 3,
//         border: 0,
//         color: 'white',
//         height: 48,
//         padding: '0 30px',
//         boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//         label: {flexDirection: 'column'},
//         marginLeft: 10
//     }
// })

const theme = createMuiTheme({
    palette:{
        primary: {
            main: '#47abd8'
        }
    }
})

function AdminButton() {

    return (
        <ThemeProvider>
            <ButtonGroup color="primary">
                <Button>Manage Users</Button>
            </ButtonGroup>
        </ThemeProvider>
        
    )
}

export default AdminButton
