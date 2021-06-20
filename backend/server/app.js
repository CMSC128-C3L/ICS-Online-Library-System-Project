const express = require('express');

const router = require('./router.js');
require('./database/connection.js');

const app = express();
app.use(express.json());
app.use(router);

// statically serve the books and advisory image files
const path = require('path');
app.use('/static/', express.static(path.join(__dirname, 'uploads/books')));
app.use('/static/', express.static(path.join(__dirname, 'uploads/home_advisory')));
app.use('/static/', express.static(path.join(__dirname, 'uploads/thesis')));
app.use('/static/', express.static(path.join(__dirname, 'uploads/sp')));

module.exports = app;