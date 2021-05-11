const express = require('express');
const User = require('./controllers/userController.js');
const router = new express.Router;

// User routes
router.post('/api/users/login', User.login);

module.exports = router;