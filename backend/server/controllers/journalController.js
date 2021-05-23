const Journal= require('../models/Journal.js');

module.exports = {
  getAll,
  getOne,
  create,
  deleteJournal,
  update
};


async function getAll(req, res) {
	try{
	//get All Journal
	let list_journal=await Journal.find({});

	const journal=[]; 
    list_journal.map(obj =>{
        let temp={};
        temp.type=obj.type;
        temp.title = obj.title;
        temp.author = obj.author;
        temp.isbn= obj.isbn;
        temp.publication= obj.publication;
        temp.subject= obj.subject;
   
        journal.push(temp);
        
    });

    res.status(200).send(journal);

	}catch(err){
	res.status(400).send({message:"Error"});

	}
	


}
async function getOne(req, res) {
	try{
        //get id 
        let _id = req.params.id;    
        //get specific Journal
        let journal=await Journal.findById({_id});
        if(journal!=null){
            let temp= {}
            temp.type=journal.type;
            temp.title = journal.title;
            temp.author = journal.author;
            temp.isbn= journal.isbn;
            temp.publication= journal.publication;
            temp.subject= journal.subject;
            res.status(200).send(temp);
        }

        res.status(404).send({message:"Journal not found"});
    
        }catch(err){
        res.status(400).send({message:"Error"});
    
        }

}

async function create(req, res) {

}

async function deleteJournal(req, res) {
    
}

async function update(req, res) {
    
}