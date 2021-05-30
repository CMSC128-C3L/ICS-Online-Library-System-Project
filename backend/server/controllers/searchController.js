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
  searchSp,
  advanceSearchBook,
  advanceSearchThesis,
  advanceSearchSp,
  advanceSearchJournal
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
		const book = await Book.find({$or:[{title: {$regex: query}}, {author:{$regex: query}}, {isbn:{$regex: query}}, {publisher:{$regex: query}}, {description:{$regex: query}}, {topic:{$regex: query}}, {'courses.code': {$regex: query}}]});
		const thesis = await Thesis.find({type:'Thesis', $or:[{title: {$regex: query}}, {author:{$regex: query}}, {adviser:{$regex: query}}, {abstract:{$regex: query}}, {topic:{$regex: query}}]});
		const sp = await Sp.find({type:'Special Problem', $or:[{title: {$regex: query}}, {author:{$regex: query}}, {adviser:{$regex: query}}, {abstract:{$regex: query}}, {topic:{$regex: query}}]});
		const journal = await Journal.find({$or: [{title: {$regex: query}}, {author:{$regex: query}}, {adviser:{$regex: query}}, {topic:{$regex: query}}], journal:{$exists: true, $ne : ''}});
		
		result.push(book);
		result.push(thesis);
		result.push(sp);
		result.push(journal);
		
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
		const book = await Book.find({$or:[{title: {$regex: query}}, {author:{$regex: query}}, {isbn:{$regex: query}}, {publisher:{$regex: query}}, {description:{$regex: query}}, {topic:{$regex: query}}, {'courses.code': {$regex: query}}]});
		if(book != null) res.status(200).send(book);
		else res.status(404).send("Book not found!");
	}catch(error){
		res.status(500).send();
	}
}

async function searchJournal(req, res) {
	try{
		let query = new RegExp(req.query.search, 'i');
		const journal = await Journal.find({$or: [{title: {$regex: query}}, {author:{$regex: query}}, {adviser:{$regex: query}}, {topic:{$regex: query}}], journal:{$exists: true, $ne : ''}});
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
		res.status(500).send();
	}
}


async function advanceSearchBook(req, res) {
	try{
		let query = new RegExp(req.query.search, 'i');
		let courseCode = req.query.courseCode;
		let topics = req.query.topic;
		let book;
		
		if(typeof(topics) === 'object' && courseCode != ''){//it's an array 
			book = await Book.find({$or:[{title: {$regex: query}}, {author:{$regex: query}}, {isbn:{$regex: query}}, {publisher:{$regex: query}}, {description:{$regex: query}}], 'courses.code': courseCode, topic: { $all : topics}});
		}else if(typeof(topics) === 'object' && courseCode == ''){
			book = await Book.find({$or:[{title: {$regex: query}}, {author:{$regex: query}}, {isbn:{$regex: query}}, {publisher:{$regex: query}}, {description:{$regex: query}}, {'courses.code':{$regex: query}}], topic: { $all : topics}});
		}else if (topics == '' && courseCode != ''){//it's empty
			book = await Book.find({$or:[{title: {$regex: query}}, {author:{$regex: query}}, {isbn:{$regex: query}}, {publisher:{$regex: query}}, {description:{$regex: query}}, {topic:{$regex: query}}], 'courses.code': courseCode});
		}else if(topics == '' && courseCode == ''){
			book = await Book.find({$or:[{title: {$regex: query}}, {author:{$regex: query}}, {isbn:{$regex: query}}, {publisher:{$regex: query}}, {description:{$regex: query}}, {topic:{$regex: query}}, {'courses.code':{$regex: query}}]});
		}else{//it's a string
			if(courseCode != ''){
				book = await Book.find({$or:[{title: {$regex: query}}, {author:{$regex: query}}, {isbn:{$regex: query}}, {publisher:{$regex: query}}, {description:{$regex: query}}], 'courses.code': courseCode, topic: topics});
			}else{
				book = await Book.find({$or:[{title: {$regex: query}}, {author:{$regex: query}}, {isbn:{$regex: query}}, {publisher:{$regex: query}}, {description:{$regex: query}}, {'courses.code':{$regex: query}}], topic: topics});
			}
		}
		if(book != null) res.status(200).send(book);
		else res.status(404).send("Book not found!");
	}catch{
		res.status(500).send();
	}
}

async function advanceSearchThesis(req, res) {
	try{
		let query = new RegExp(req.query.search, 'i');
		let topics = req.query.topic;
		let thesis;

		if(typeof(topics) === 'object'){//it's an array 
			thesis = await Thesis.find({type:'Thesis', $or:[{title: {$regex: query}}, {author:{$regex: query}}, {adviser:{$regex: query}}, {abstract:{$regex: query}}], topic:{$all:topics}});
		}else if(topics == ''){
			thesis = await Thesis.find({type:'Thesis', $or:[{title: {$regex: query}}, {author:{$regex: query}}, {adviser:{$regex: query}}, {abstract:{$regex: query}}, {topic:{$regex: query}}]});
		}else{//it's a string
			thesis = await Thesis.find({type:'Thesis', $or:[{title: {$regex: query}}, {author:{$regex: query}}, {adviser:{$regex: query}}, {abstract:{$regex: query}}], topic:topics});
		}
		if(thesis != null) res.status(200).send(thesis);
		else res.status(404).send("Thesis not found!");
	}catch{
		res.status(500).send();
	}
}

async function advanceSearchSp(req, res) {
	try{
		let query = new RegExp(req.query.search, 'i');
		let topics = req.query.topic;
		let sp;

		if(typeof(topics) === 'object'){//it's an array 
			sp = await Sp.find({type:'Special Problem', $or:[{title: {$regex: query}}, {author:{$regex: query}}, {adviser:{$regex: query}}, {abstract:{$regex: query}}], topic:{$all:topics}});
		}else if(topics == ''){
			sp = await Sp.find({type:'Special Problem', $or:[{title: {$regex: query}}, {author:{$regex: query}}, {adviser:{$regex: query}}, {abstract:{$regex: query}}, {topic:{$regex: query}}]});
		}else{//it's a string
			sp = await Sp.find({type:'Special Problem', $or:[{title: {$regex: query}}, {author:{$regex: query}}, {adviser:{$regex: query}}, {abstract:{$regex: query}}], topic:topics});
		}
		if(sp != null) res.status(200).send(sp);
		else res.status(404).send("SP not found!");
	}catch{
		res.status(500).send();
	}
}

async function advanceSearchJournal(req, res) {
	try{
		let query = new RegExp(req.query.search, 'i');
		let courseCode = req.query.courseCode;
		let topics = req.query.topic;
		let journal;

		if(typeof(topics) === 'object'){//it's an array 
			journal = await Journal.find({$or: [{title: {$regex: query}}, {author:{$regex: query}}, {adviser:{$regex: query}}], journal:{$exists: true, $ne : ''}, topic:{$all:topics}});
		}else if(topics == ''){
			journal = await Journal.find({$or: [{title: {$regex: query}}, {author:{$regex: query}}, {adviser:{$regex: query}}, {topic:{$regex: query}}], journal:{$exists: true, $ne : ''}});
		}else{//it's a string
			journal = await Journal.find({$or: [{title: {$regex: query}}, {author:{$regex: query}}, {adviser:{$regex: query}}], journal:{$exists: true, $ne : ''}, topic:topics});
		}
		if(journal != null) res.status(200).send(journal);
		else res.status(404).send("Journal not found!");
	}catch{
		res.status(500).send();
	}
}