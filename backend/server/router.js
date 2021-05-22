const express = require('express');
const User = require('./controllers/userController.js');
const Thesis = require('./controllers/thesisController.js');
const auth = require('./middlewares/auth.js');
const router = new express.Router;
const isAdmin = require('./middlewares/isAdmin.js');

// Sample test route
router.get('/api', (req, res) => {
  res.send({message: 'OK'});
});

// User routes
router.post('/api/users/login', User.login);
router.get('/api/users/logout', auth, User.logout);

// Thesis routes
router.get('/api/thesis/', auth, Thesis.getAll);
router.get('/api/thesis/:id', auth, Thesis.getOne);
router.post('/api/thesis', auth, isAdmin, Thesis.create);
router.patch('/api/thesis/:id', auth, isAdmin, Thesis.update);
router.delete('/api/thesis/:id', auth, isAdmin, Thesis.deleteOne);


// SP routes
const Sp = require('./controllers/spController.js');
router.get('/api/sp', Sp.getAll);
router.get('/api/sp/:id', Sp.getOne);



// Book routes
const Book = require('./controllers/bookController.js');
const isAdmin = require('./middlewares/isAdmin.js');
router.get('/api/books', auth, Book.getAll);
router.get('/api/books/:id', auth, Book.get);
router.post('/api/books', auth, isAdmin, Book.create);
router.patch('/api/books/:id', auth, isAdmin, Book.update);
router.delete('/api/books/:id', auth, isAdmin, Book.deleteBook);



// Journal routes


//


//


//
module.exports = router;