const express = require('express');
const User = require('./controllers/userController.js');
const Thesis = require('./controllers/thesisController.js');
const auth = require('./middlewares/auth.js');
const router = new express.Router;
const isAdmin = require('./middlewares/isAdmin.js');
const AuthorSummary = require("./controllers/authorSummary.js");
const AdviserSummary = require("./controllers/adviserSummary.js");
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
router.get('/api/thesis/download/:type/:token/:id', Thesis.download);
router.post('/api/thesis/upload/:id', auth, isAdmin, Thesis.uploadFields, Thesis.uploadFiles);
router.patch('/api/thesis/:id', auth, isAdmin, Thesis.update);
router.delete('/api/thesis/:id', auth, isAdmin, Thesis.deleteOne);


// SP routes
const Sp = require('./controllers/spController.js');
router.get('/api/sp',auth, Sp.getAll);
router.get('/api/sp/:id',auth, Sp.getOne);
router.get('/api/sp/download/:type/:token/:id',Sp.downloadSp);
router.post('/api/sp',auth, isAdmin, Sp.create);
router.patch('/api/sp/:id', auth, isAdmin, Sp.update);
router.delete('/api/sp/:id', auth, isAdmin, Sp.deleteSp);
router.post('/api/sp/upload/:id',auth, isAdmin, Sp.upload.fields([{
  name: "spFile", maxCount: 1
}, {
  name: "journalFile", maxCount: 1
}, {
  name: "posterFile", maxCount: 1
}
]),Sp.uploadSp);




// Book routes
const Book = require('./controllers/bookController.js');
router.get('/api/books', auth, Book.getAll);
router.get('/api/books/:id', auth, Book.get);
router.post('/api/books', auth, isAdmin, Book.create);
router.patch('/api/books/:id', auth, isAdmin, Book.update);
router.delete('/api/books/:id', auth, isAdmin, Book.deleteBook);
router.post('/api/books/upload/:id', auth, Book.uploads, Book.uploadBookCover);



// Journal routes
const Journal = require('./controllers/journalController.js');
router.get('/api/journal', auth, Journal.getAll);
router.get('/api/journal/:id', auth, Journal.getOne);
//


//search
const Search = require('./controllers/searchController.js');
router.get('/api/search/user', auth, Search.searchUser);
router.get('/api/search/all', auth, Search.searchAll);
router.get('/api/search/thesis', auth, Search.searchThesis);
router.get('/api/search/book', auth, Search.searchBook);
router.get('/api/search/journal', auth, Search.searchJournal);
router.get('/api/search/sp', auth, Search.searchSp);
router.get('/api/search/filter/book', auth, Search.advanceSearchBook);
router.get('/api/search/filter/thesis', auth, Search.advanceSearchThesis);
router.get('/api/search/filter/sp', auth, Search.advanceSearchSp);
router.get('/api/search/filter/journal', auth, Search.advanceSearchJournal);

//Activity Logs
const Logs = require('./controllers/activityLogsController.js');
router.get('/api/log', auth, Logs.getAll);
router.get('/api/log/:user_id', auth, Logs.getOne);
router.get('/api/log/user/:email', auth, Logs.getUserId);
router.post('/api/log/login', auth, Logs.recordUser);
router.post('/api/log/logout', auth, Logs.logoutUser);
router.patch('/api/log/doc/:user_id', auth, Logs.updateRecord);

//author summary
router.get('/api/authorSummary/:author', AuthorSummary.getAuthorSummary); // auth, isAdmin, 

//adviser summary
router.get('/api/adviserSummary/:adviser', AdviserSummary.getAdviserSummary);

//course summary
router.get('/api/courseSummary/:course', CourseSummary.getCourseSummary);

//course details
const Course = require('./controllers/courseController.js');
router.get('/api/course', auth, Course.getAll);
router.get('/api/course/:code', auth, Course.getOne);

// Advisory Routes
const HomeAdvisory = require('./controllers/homeAdvisoryController.js');
router.get('/api/advisory', HomeAdvisory.getAll);
router.get('/api/advisory/:id', HomeAdvisory.getOne);
router.patch('/api/advisory/:id', HomeAdvisory.update);
router.post('/api/advisory/uploads/:id', HomeAdvisory.uploads, HomeAdvisory.uploadThumbnail);

module.exports = router;
