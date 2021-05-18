const express = require('express');
const User = require('./controllers/userController.js');
const Thesis = require('./controllers/thesisController.js');
const auth = require('./middlewares/auth.js');
const router = new express.Router;

// Sample test route
router.get('/api', (req, res) => {
  res.send({message: 'OK'});
});

// User routes
router.post('/api/users/login', User.login);
router.get('/api/users/logout', auth, User.logout);

// Thesis routes
router.get('/api/thesis/sample', auth, Thesis.sample)


// SP routes


// Book routes
const Book = require('./controllers/bookController.js');
router.get('/api/books', auth, Book.getAll);



// Journal routes


//


//


//
module.exports = router;