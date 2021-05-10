//This file is the entry point of the server

//npm packages
const express = require('express')

//instantiate server
const app = express()

const router = require('./server/router')
router(app)

app.listen(5000)