const Logs = require("../models/ActivityLogs.js");
const User = require('../models/User.js');

module.exports = {
	recordUser,
	logoutUser,
	getUserId
};

async function getAll(req, res){

}

async function getOne(req, res){
	
}

async function updateRecord(req, res){
	
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