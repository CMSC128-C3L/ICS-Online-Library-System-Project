const express = require('express');
const User = require('./controllers/userController.js');
const auth = require('./middlewares/auth.js');
const router = new express.Router;

// User routes
router.post('/api/users/login', User.login);
router.get('/api/users/logout', auth, User.logout);

module.exports = router;