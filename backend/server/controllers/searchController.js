const Thesis = require('../models/Thesis.js');
const Book = require('../models/Book.js');
const Journal = require('../models/Journal.js');
const Sp = require('../models/Sp.js');
const User = require('../models/User.js');

module.exports = {
  searchUser,
  searchAll,
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

async function searchAll(req, res) {
	try{
		const result = [];
		let query = new RegExp(req.query.search, 'i');
		const thesis = await Thesis.find({type:'Thesis', $or:[{title: {$regex: query}}, {author:{$regex: query}}, {adviser:{$regex: query}}, {abstract:{$regex: query}}, {topic:{$regex: query}}]});
		const book = await Book.find({$or:[{title: {$regex: query}}, {author:{$regex: query}}, {isbn:{$regex: query}}, {publisher:{$regex: query}}, {description:{$regex: query}}, {topic:{$regex: query}}, {"course code":{$regex: query}}]});
		// const journal = await Journal.find({title:req.query.title});
		const sp = await Sp.find({type:'Special Problem', $or:[{title: {$regex: query}}, {author:{$regex: query}}, {adviser:{$regex: query}}, {abstract:{$regex: query}}, {topic:{$regex: query}}]});

		result.push(thesis);
		result.push(book);
		// result.push(journal);
		result.push(sp);

		res.status(200).send(result);
	}catch(error){
		res.status(500).send();
	}
}

async function searchThesis(req, res) {
	try{
		let query = new RegExp(req.query.search, 'i');
		const thesis = await Thesis.find({type:'Thesis', $or:[{title: {$regex: query}}, {author:{$regex: query}}, {adviser:{$regex: query}}, {abstract:{$regex: query}}, {topic:{$regex: query}}]});
		if(thesis != null) res.status(200).send(thesis);
		else res.status(404).send("Thesis not found!");
	}catch(error){
		res.status(500).send();
	}
}

async function searchBook(req, res) {
	try{
		let query = new RegExp(req.query.search, 'i');
		const book = await Book.find({$or:[{title: {$regex: query}}, {author:{$regex: query}}, {isbn:{$regex: query}}, {publisher:{$regex: query}}, {description:{$regex: query}}, {topic:{$regex: query}}, {"course code":{$regex: query}}]});
		if(book != null) res.status(200).send(book);
		else res.status(404).send("Book not found!");
	}catch(error){
		res.status(500).send();
	}
}

async function searchJournal(req, res) {
	try{
		let query = new RegExp(req.query.search, 'i');
		const journal = await Journal.find({title: {$regex: query}});
		if(journal != null) res.status(200).send(journal);
		else res.status(404).send("Journal not found!");
	}catch(error){
		res.status(500).send();
	}
}

async function searchSp(req, res) {
	try{
		let query = new RegExp(req.query.search, 'i');
		const sp = await Sp.find({type:'Special Problem', $or:[{title: {$regex: query}}, {author:{$regex: query}}, {adviser:{$regex: query}}, {abstract:{$regex: query}}, {topic:{$regex: query}}]});
		if(sp != null) res.status(200).send(sp);
		else res.status(404).send("SP not found!");
	}catch(error){
		res.status(404).send();
	}
}