const Logs = require("../models/ActivityLogs.js");
const User = require('../models/User.js');

module.exports = {
	getUserId,
	recordUser,
	logoutUser,
	getAll,
	getOne,
	updateRecord,
	deleteRecord
};

async function getAll(req, res){
	try{
		const logs = await Logs.find({});
		res.status(200).send(logs);
	}catch(err){
		console.log(err);
		res.status(500).send();
	}
}

async function getOne(req, res){
	try{
		const user_id = req.params.user_id;
		const log = await Logs.find({user_id}, {log_date:{$slice:-1}});
		if(!log) res.status(400).send();
		else res.status(200).send(log);
	}catch(err){
		console.log(err);
		res.status(500).send();
	}
}

async function updateRecord(req, res){
	try{
		const user_id = req.params.user_id;
		const _id = req.body.doc_id;
        const date = new Date();
        const book_log = {
            doc_oid: _id,
            date: date.toISOString(),
            status: "view"
        }
        const log = await Logs.findOneAndUpdate({user_id}, {$inc: {doc_count: 1}, $push:{doc_log:book_log}}, {new:true, rawResult:true, useFindAndModify:false});
        res.status(200).send();
	}catch(err){
		console.log(err);
		res.status(500).send();
	}
}

async function deleteRecord(req, res) {
	try {
		const user_id = req.params.user_id;
		const _id = req.body.doc_id;
		const log = await Logs.findOne({user_id});
		if(!log) return res.status(404).send();
		
		const cleanedLog = log.doc_log.filter((doc) => {
			return doc.doc_oid !== _id
		});
		log.doc_log = cleanedLog;
		log.doc_count = cleanedLog.length;
		await log.save();
		res.status(200).send();
	} catch(e) {
		res.status(500).send();
	}
}

async function recordUser(req, res){
	try{
		const user_id = req.body.user_id;
		const logDate = req.body.log_date[0];
		const user = await Logs.findOne({user_id});
		let login;
		if(!user){
			const log = new Logs(req.body);
			login = await log.save();
		}else{
			login = await Logs.findOneAndUpdate({user_id}, {$push:{log_date: logDate}}, {new:true, rawResult:true, useFindAndModify:false});
		}
		const newLog = await Logs.find({user_id}, {log_date:{$slice:-1}});
		const _id = newLog[0].log_date[0]._id;
		res.status(201).send(_id); 
	}catch(err){
		console.log(err);
		res.status(500).send();
	}
	
}

async function logoutUser(req, res){
	try{
		const user_id = req.body.user_id;
		const log_id = req.body.log_id;
		const logDate = req.body.log_date[0].logout;
		const logout = await Logs.findOneAndUpdate({user_id, 'log_date._id':log_id}, {$set:{'log_date.$.logout':logDate}}, {new:true, rawResult:true, useFindAndModify:false});
		if(!logout) res.status(400).send(); 
		else res.status(201).send(); 
	}catch(err){
		console.log(err);
		res.status(500).send();
	}
	
}

async function getUserId(req, res){
	try{
		const email = req.params.email;
		const user = await User.findOne({email});
		if(user != null) res.status(200).send(user._id);
		else res.status(404).send("User not found!");
	}catch(err){
		res.status(500).send();
	}
}