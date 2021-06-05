const express = require('express');
const User = require('./controllers/userController.js');
const Thesis = require('./controllers/thesisController.js');
const auth = require('./middlewares/auth.js');
const router = new express.Router;
const isAdmin = require('./middlewares/isAdmin.js');
const AuthorSummary = require("./controllers/authorSummary.js");
const CourseSummary = require("./controllers/courseSummary.js");

// Sample test route
router.get('/api', (req, res) => {
  res.send({message: 'OK'});
});

// User routes
router.post('/api/users/login', User.login);
router.get('/api/users/logout', auth, User.logout);
router.get('/api/users', auth, isAdmin, User.getAll);
router.get('/api/users/:id', auth, isAdmin, User.getOne);
router.patch('/api/users/:id', auth, isAdmin, User.update);
router.delete('/api/users/:id', auth, isAdmin, User.deleteOne);

// Thesis routes
router.get('/api/thesis/', auth, Thesis.getAll);
router.get('/api/thesis/:id', auth, Thesis.getOne);
router.post('/api/thesis', auth, isAdmin, Thesis.create);
router.patch('/api/thesis/:id', auth, isAdmin, Thesis.update);
router.delete('/api/thesis/:id', auth, isAdmin, Thesis.deleteOne);


// SP routes
const Sp = require('./controllers/spController.js');
router.get('/api/sp',auth, Sp.getAll);
router.get('/api/sp/:id',auth, Sp.getOne);
router.post('/api/sp',auth, isAdmin, Sp.create);
router.patch('/api/sp/:id', auth, isAdmin, Sp.update);
router.delete('/api/sp/:id', auth, isAdmin, Sp.deleteSp);



// Book routes
const Book = require('./controllers/bookController.js');
router.get('/api/books', auth, Book.getAll);
router.get('/api/books/:id', auth, Book.get);
router.post('/api/books', auth, isAdmin, Book.create);
router.patch('/api/books/:id', auth, isAdmin, Book.update);
router.delete('/api/books/:id', auth, isAdmin, Book.deleteBook);



// Journal routes
const Journal = require('./controllers/journalController.js');
router.get('/api/journal', auth, Journal.getAll);
router.get('/api/journal/:id', auth, Journal.getOne);
//


//search
const Search = require('./controllers/searchController.js');
router.get('/api/search/user', Search.searchUser);
router.get('/api/search/all', Search.searchAll);
router.get('/api/search/thesis', Search.searchThesis);
router.get('/api/search/book', Search.searchBook);
router.get('/api/search/journal', Search.searchJournal);
router.get('/api/search/sp', Search.searchSp);
router.get('/api/search/filter/book', Search.advanceSearchBook);
router.get('/api/search/filter/thesis', Search.advanceSearchThesis);
router.get('/api/search/filter/sp', Search.advanceSearchSp);
router.get('/api/search/filter/journal', Search.advanceSearchJournal);


//author summary
router.get('/api/authorSummary/:author', AuthorSummary.getAuthorSummary);
router.get('/api/authorSummaryPDF/:author', AuthorSummary.getAuthorSummaryPDF);

//course summary
router.get('/api/courseSummary', CourseSummary.getCourseSummary);
router.get('/api/courseSummaryPDF', CourseSummary.getCourseSummaryPDF);

module.exports = router;

