const express = require('express');

const router = require('./router.js');
require('./database/connection.js');

const app = express();
app.use(express.json());
app.use(router);

// sample test route
app.get('/api', (req, res) => {
  res.send({message: 'OK'});
});

module.exports = app;