const express = require('express');

const app = express();
require('./database/connection.js');

// sample test route
app.get('/api', (req, res) => {
  res.send({message: 'OK'});
});

module.exports = app;