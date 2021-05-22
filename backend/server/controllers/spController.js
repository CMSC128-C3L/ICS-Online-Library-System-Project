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
	let list_sp=await Sp.find({});

	const sp=[]; 
    list_sp.map(obj =>{
        let temp={};
        temp.type=obj.type;
        temp.title = obj.title;
        temp.author= obj.author;
        temp.adviser= obj.adviser;
        temp.pub_date= obj.pub_date;
        temp.abstract= obj.abstract;
        temp.topic= obj.topic;
        sp.push(temp);
        
    });

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
            let temp= {}
            temp.type=sp.type;
            temp.title = sp.title;
            temp.author= sp.author;
            temp.adviser= sp.adviser;
            temp.pub_date= sp.pub_date;
            temp.abstract= sp.abstract;
            temp.topic= sp.topic;
            res.status(200).send(temp);
        }

        res.status(404).send({message:"Sp not found"});
    
        }catch(err){
        res.status(400).send({message:"Error"});
    
        }

}

async function create(req, res) {

}

async function deleteSp(req, res) {
    
}

async function update(req, res) {
    
}