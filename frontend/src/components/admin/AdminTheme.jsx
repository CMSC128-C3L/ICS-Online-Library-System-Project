import React from 'react'
import {createMuiTheme} from '@material-ui/core/styles'

const theme = createMuiTheme({
    palette:{
        primary: {
            main: '#47abd8',
            light: '#95d2ec'
        }
    },

    typography:{
        fontFamily:[
            '-apple-system'
        ].join(',')
    }
})

export default theme