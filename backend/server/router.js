const express = require('express');
const User = require('./controllers/userController.js');
const auth = require('./middlewares/auth.js');
const router = new express.Router;

// Sample test route
router.get('/api', (req, res) => {
  res.send({message: 'OK'});
});

// User routes
router.post('/api/users/login', User.login);
router.get('/api/users/logout', auth, User.logout);

module.exports = router;