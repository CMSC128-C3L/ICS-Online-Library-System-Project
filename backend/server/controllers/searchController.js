const Thesis = require('../models/Thesis.js');
const Book = require('../models/Book.js');
const Journal = require('../models/Journal.js');
const Sp = require('../models/Sp.js');
const User = require('../models/User.js');

module.exports = {
  searchUser,
  searchAllByTitle,
  searchThesis,
  searchBook,
  searchJournal,
  searchSp
}

async function searchUser(req, res) {
	try{
		User.find({name:req.query.user}, (err, user) => {
			if(user != null) res.status(200).send(user);
			else res.send("No User Found!");
		});
		// console.log(user);
		// res.status(200).send(user);
	}catch(error){
		// console.log(error);
		res.status(404).send();
	}
	
}

async function searchAllByTitle(req, res) {
	try{
		const result = [];
		const thesis = await Thesis.find({title:req.query.title});
		const book = await Book.find({title:req.query.title});
		const journal = await Journal.find({title:req.query.title});
		const sp = await Sp.find({title:req.query.title});

		result.push(thesis);
		result.push(book);
		result.push(journal);
		result.push(sp);

		res.status(200).send(result);
	}catch(error){
		res.status(404).send();
	}
}

async function searchThesis(req, res) {
	try{
		Thesis.find({title:req.query.title}, (err, thesis) => {
			if(thesis != null) res.status(200).send(thesis);
			else res.status(404).send("Thesis not found!");
		});
	}catch(error){
		res.status(404).send();
	}
}


async function searchBook(req, res) {
	try{
		Book.find({title:req.query.title}, (err, book) => {
			if(book != null) res.status(200).send(book);
			else res.status(404).send("Book not found!");
		});
	}catch(error){
		res.status(404).send();
	}
}

async function searchJournal(req, res) {
	try{
		Journal.find({title:req.query.title}, (err, journal) => {
			if(journal != null) res.status(200).send(journal);
			else res.status(404).send("Journal not found!");
		});
	}catch(error){
		res.status(404).send();
	}
}

async function searchSp(req, res) {
	try{
		Sp.find({title:req.query.title}, (err, sp) => {
			if(sp != null) res.status(200).send(sp);
			else res.status(404).send("SP not found!");
		});
	}catch(error){
		res.status(404).send();
	}
}