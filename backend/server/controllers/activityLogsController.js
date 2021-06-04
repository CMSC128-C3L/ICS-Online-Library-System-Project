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
	console.log(req.body);
	try{
		const user_id = req.body.user_id;
		const logDate = req.body.log_date[0];
		const user = await Logs.findOne({user_id});
		let login;
		if(!user){
			const log = new Logs(req.body);
			login = await log.save();
		}else{
			login = await Logs.findOneAndUpdate({user_id}, {$push:{log_date: logDate}}, {new:true, rawResult:true});
		}
		console.log(login);
		res.status(201).send(); 
	}catch(err){
		console.log(err);
		res.status(500).send();
	}
	
}

async function logoutUser(req, res){
	console.log(req.body);
	try{
		const user_id = req.body.user_id;
		const logDate = req.body.log_date[0].logout;
		const user = await Logs.findOne({user_id});
		// if(!user) res.send(400).send();
		// else{
		// 	const updateLog = await Logs.updateOne({user_id, "log_date._id":}, {$set:{logout:logDate}});
		// }
		res.status(201).send(); 
	}catch(err){
		console.log(err);
		res.status(500).send();
	}
	
}

async function getUserId(req, res){
	try{
		console.log("GET USER ID");
		const email = req.params.email;
		const user = await User.findOne({email});
		if(user != null) res.status(200).send(user._id);
		else res.status(404).send("User not found!");
	}catch(err){
		res.status(500).send();
	}
}