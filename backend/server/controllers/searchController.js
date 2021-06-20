const Thesis = require('../models/Thesis.js');
const Book = require('../models/Book.js');
const Journal = require('../models/Journal.js');
const Sp = require('../models/Sp.js');
const User = require('../models/User.js');
const bookFunc = require('./bookController.js');

module.exports = {
	findById,
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
async function findById(req, res) {
	try {
		const _id = req.params.id;
		const book = await Book.findOne({_id});
		if(book) return res.send(book)
		const thesis = await Thesis.findOne({_id});
		if(thesis) return res.send(thesis)
		const sp = await Thesis.findOne({_id});
		if(sp) return res.send(sp);
		console.log(book, thesis, sp);
		res.status(404).send();
	} catch(e) {
		console.log(e)
		res.status(500).send();
	}
}

async function searchAll(req, res) {
	try{
		const result = [];
		let query = new RegExp(req.query.search, 'i');
		let classification = req.user.classification;

		const book_data = await Book.find({$or:[{title: {$regex: query}}, {author:{$regex: query}}, {isbn:{$regex: query}}, {publisher:{$regex: query}}, {description:{$regex: query}}, {topic:{$regex: query}}, {'courses.code': {$regex: query}}]});
		const thesis_data = await Thesis.find({type:'Thesis', $or:[{title: {$regex: query}}, {author:{$regex: query}}, {adviser:{$regex: query}}, {abstract:{$regex: query}}, {topic:{$regex: query}}]});
		const sp_data = await Sp.find({type:'Special Problem', $or:[{title: {$regex: query}}, {author:{$regex: query}}, {adviser:{$regex: query}}, {abstract:{$regex: query}}, {topic:{$regex: query}}]});
		// const journal_data = await Journal.find({$or: [{title: {$regex: query}}, {author:{$regex: query}}, {adviser:{$regex: query}}, {topic:{$regex: query}}], journal:{$exists: true, $ne : ''}});
		
		const book = book_data.map(item => bookFunc.bookBase(item));
		const thesis = thesis_data.map(item => filterResults(item, classification));
		const sp = sp_data.map(item => filterResults(item, classification));
		// const journal = journal_data.map(item => bookFunc.bookBase(item));
		console.log(thesis);
		console.log(sp);

		result.push(book);
		result.push(thesis);
		result.push(sp);
		// result.push(journal);
		
		res.status(200).send(result);
	}catch(error){
		console.log(error);
		res.status(500).send();
	}
}

async function searchThesis(req, res) {
	try{
		let classification = req.user.classification;
		let query = new RegExp(req.query.search, 'i');
		const thesis_data = await Thesis.find({type:'Thesis', $or:[{title: {$regex: query}}, {author:{$regex: query}}, {adviser:{$regex: query}}, {abstract:{$regex: query}}, {topic:{$regex: query}}]});
		if(thesis_data != null){
			const thesis = thesis_data.map(item => filterResults(item, classification));
			res.status(200).send(thesis);
		}
		else res.status(404).send("Thesis not found!");
	}catch(error){
		res.status(500).send();
	}
}

async function searchBook(req, res) {
	try{
		let classification = req.user.classification;
		let query = new RegExp(req.query.search, 'i');
		const data = await Book.find({$or:[{title: {$regex: query}}, {author:{$regex: query}}, {isbn:{$regex: query}}, {publisher:{$regex: query}}, {description:{$regex: query}}, {topic:{$regex: query}}, {'courses.code': {$regex: query}}]});
		const book = data.map(item => bookFunc.bookBase(item));
		if(book != null) res.status(200).send(book);
		else res.status(404).send("Book not found!");
	}catch(error){
		res.status(500).send();
	}
}

async function searchJournal(req, res) {
	try{
		let classification = req.user.classification;
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
		let classification = req.user.classification;
		let query = new RegExp(req.query.search, 'i');
		const sp_data = await Sp.find({type:'Special Problem', $or:[{title: {$regex: query}}, {author:{$regex: query}}, {adviser:{$regex: query}}, {abstract:{$regex: query}}, {topic:{$regex: query}}]});
		if(sp_data != null) {
			const sp = sp_data.map(item => filterResults(item, classification));
			res.status(200).send(sp);
		}
		else res.status(404).send("SP not found!");
	}catch(error){
		res.status(500).send();
	}
}


async function advanceSearchBook(req, res) {
	try{
		let classification = req.user.classification;
		let query = new RegExp(req.query.search, 'i');
		let courseCode = req.query.courseCode;
		let topics = req.query.topic;
		let data;
		
		if(typeof(topics) === 'object' && courseCode != ''){//it's an array 
			data = await Book.find({$or:[{title: {$regex: query}}, {author:{$regex: query}}, {isbn:{$regex: query}}, {publisher:{$regex: query}}, {description:{$regex: query}}], 'courses.code': courseCode, topic: { $all : topics}});
		}else if(typeof(topics) === 'object' && courseCode == ''){
			data = await Book.find({$or:[{title: {$regex: query}}, {author:{$regex: query}}, {isbn:{$regex: query}}, {publisher:{$regex: query}}, {description:{$regex: query}}, {'courses.code':{$regex: query}}], topic: { $all : topics}});
		}else if (topics == '' && courseCode != ''){//it's empty
			data = await Book.find({$or:[{title: {$regex: query}}, {author:{$regex: query}}, {isbn:{$regex: query}}, {publisher:{$regex: query}}, {description:{$regex: query}}, {topic:{$regex: query}}], 'courses.code': courseCode});
		}else if(topics == '' && courseCode == ''){
			data = await Book.find({$or:[{title: {$regex: query}}, {author:{$regex: query}}, {isbn:{$regex: query}}, {publisher:{$regex: query}}, {description:{$regex: query}}, {topic:{$regex: query}}, {'courses.code':{$regex: query}}]});
		}else{//it's a string
			if(courseCode != ''){
				data = await Book.find({$or:[{title: {$regex: query}}, {author:{$regex: query}}, {isbn:{$regex: query}}, {publisher:{$regex: query}}, {description:{$regex: query}}], 'courses.code': courseCode, topic: topics});
			}else{
				data = await Book.find({$or:[{title: {$regex: query}}, {author:{$regex: query}}, {isbn:{$regex: query}}, {publisher:{$regex: query}}, {description:{$regex: query}}, {'courses.code':{$regex: query}}], topic: topics});
			}
		}
		const book = data.map(item => bookFunc.bookBase(item));
		if(book != null) res.status(200).send(book);
		else res.status(404).send("Book not found!");
	}catch{
		res.status(500).send();
	}
}

async function advanceSearchThesis(req, res) {
	try{
		let classification = req.user.classification;
		let query = new RegExp(req.query.search, 'i');
		let courseCode = req.query.courseCode;
		let topics = req.query.topic;
		let thesis_data;

		if(req.query.search == '' && topics == '' && courseCode != '') res.status(200).send([]);

		if(typeof(topics) === 'object'){//it's an array 
			thesis_data = await Thesis.find({type:'Thesis', $or:[{title: {$regex: query}}, {author:{$regex: query}}, {adviser:{$regex: query}}, {abstract:{$regex: query}}], topic:{$all:topics}});
		}else if(topics == ''){
			thesis_data = await Thesis.find({type:'Thesis', $or:[{title: {$regex: query}}, {author:{$regex: query}}, {adviser:{$regex: query}}, {abstract:{$regex: query}}, {topic:{$regex: query}}]});
		}else{//it's a string
			thesis_data = await Thesis.find({type:'Thesis', $or:[{title: {$regex: query}}, {author:{$regex: query}}, {adviser:{$regex: query}}, {abstract:{$regex: query}}], topic:topics});
		}
		if(thesis_data != null){
			const thesis = thesis_data.map(item => filterResults(item, classification));
			res.status(200).send(thesis);
		}
		else res.status(404).send("Thesis not found!");
	}catch{
		res.status(500).send();
	}
}

async function advanceSearchSp(req, res) {
	try{
		let classification = req.user.classification;
		let query = new RegExp(req.query.search, 'i');
		let courseCode = req.query.courseCode;
		let topics = req.query.topic;
		let sp_data;

		if(req.query.search == '' && topics == '' && courseCode != '') res.status(200).send([]);

		if(typeof(topics) === 'object'){//it's an array 
			sp_data = await Sp.find({type:'Special Problem', $or:[{title: {$regex: query}}, {author:{$regex: query}}, {adviser:{$regex: query}}, {abstract:{$regex: query}}], topic:{$all:topics}});
		}else if(topics == ''){
			sp_data = await Sp.find({type:'Special Problem', $or:[{title: {$regex: query}}, {author:{$regex: query}}, {adviser:{$regex: query}}, {abstract:{$regex: query}}, {topic:{$regex: query}}]});
		}else{//it's a string
			sp_data = await Sp.find({type:'Special Problem', $or:[{title: {$regex: query}}, {author:{$regex: query}}, {adviser:{$regex: query}}, {abstract:{$regex: query}}], topic:topics});
		}
		if(sp_data != null){
			const sp = sp_data.map(item => filterResults(item, classification));
			res.status(200).send(sp);
		}
		else res.status(404).send("SP not found!");
	}catch{
		res.status(500).send();
	}
}

async function advanceSearchJournal(req, res) {
	try{
		let classification = req.user.classification;
		let query = new RegExp(req.query.search, 'i');
		let courseCode = req.query.courseCode;
		let topics = req.query.topic;
		let journal;

		if(req.query.search == '' && topics == '' && courseCode != '') res.status(200).send([]);

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

function filterResults(data, classification){
	const paper = {};
	switch(classification){
		case 'Admin':
			paper.source_code = data.source_code;
			paper.view_count = data.view_count;
			paper.download_count = data.download_count;
			paper.view_journal_count = data.view_journal_count;
			paper.download_journal_count = data.download_journal_count;
		case 'Faculty':
			paper.file = data.file;
		case 'Staff':
			paper.file = data.file;
		case 'Student':
			paper.poster = data.poster;
			paper.journal = data.journal;
		default:
			paper._id = data._id;
			paper.id = data.id;
			paper.type = data.type;
			paper.title = data.title;
			paper.author = data.author;
			paper.adviser = data.adviser;
			paper.pub_date = data.pub_date;
			paper.abstract = data.abstract;
			paper.topic = data.topic;
	}

	return paper;
}