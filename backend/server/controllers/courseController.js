const Course = require('../models/Course.js');

module.exports = {
	getAll,
	getOne
}

async function getAll(req, res){
	try{
		const course = await Course.find({});
    	res.status(200).send(course);
	}catch(err){
        res.status(400).send({message:"error"});
	}
}

async function getOne(req, res){
	try{
		const code = req.params.code;
		const course = await Course.find({code});
    	res.status(200).send(course);
	}catch(err){
        res.status(400).send({message:"error"});
	}
}