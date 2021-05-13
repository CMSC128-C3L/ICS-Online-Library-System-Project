import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
const styleCircle = makeStyles({
    root: {
        border: 1,
        borderColor: '#47abd8',
        borderStyle: 'solid',
        borderRadius: 100,
        background: 'white',
        width: '50px',
        maxwidth: '50px',
        height: '50px',
        maxheight: '50px',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto'
    },

    icon: {
        '&:hover':{
            background: '#47abd8',
            color: 'black'
        } 
    }
})

function AdminButtonIcon({children}) {
    const drawCircle = styleCircle(); 
    return (
        <Grid container className={drawCircle.root} justify="center">
            <Grid item>
                {children}
            </Grid>
        </Grid>
    )
}

export default AdminButtonIcon
