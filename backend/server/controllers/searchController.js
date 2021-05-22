const Thesis = require('../models/Thesis.js');
const Book = require('../models/Book.js');
// const Journal = require('../models/Journal.js');
const Sp = require('../models/Sp.js');
const User = require('../models/User.js');

module.exports = {
  searchUser,
  searchAllByTitle
}

async function searchUser(req, res) {
	const user = await User.find({name:req.query.username});

	console.log(user);
	res.status(200).send(user);
}

async function searchAllByTitle(req, res) {
	const result = [];
	const thesis = await Thesis.find({title:req.query.title});
	const book = await Book.find({title:req.query.title});
	// const journal = await Journal.find({title:req.query.title});
	const sp = await Sp.find({title:req.query.title});

	result.push(thesis);
	result.push(book);
	result.push(journal);
	result.push(sp);

	res.status(200).send(result);
}