const Sp = require('../models/Sp.js');

module.exports = {
  getAll,
  getOne,
  create,
  deleteSp,
  update
};


async function getAll(req, res) {
	try{
	//get All Sp
	const sp = await Sp.find({});
    console.log(sp);
    res.status(200).send(sp);

	}catch(err){
	res.status(400).send({message:"Error"});

	}
	
}
async function getOne(req, res) {
	try{
        //get id 
        let _id = req.params.id;    
        //get specific Sp
        let sp=await Sp.findById({_id});
        if(sp!=null){
            res.status(200).send(sp);
        }

        res.status(404).send({message:"Sp not found"});
    
        }catch(err){
        res.status(400).send({message:"Error"});
    
        }

}

async function create(req, res) {
    try{
    let new_sp= new Sp(req.body);
    let sp = await new_sp.save();
    res.status(201).send(sp);

    }catch(err){
        res.status(400).send({message:"Error"});
    }
}

async function deleteSp(req, res) {
    try{

    }catch(err){
        
    }
    
}

async function update(req, res) {
    try{

    }catch(err){
        
    }
    
}



