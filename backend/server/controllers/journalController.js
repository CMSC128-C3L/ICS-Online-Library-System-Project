const Journal= require('../models/Journal.js');

module.exports = {
  getAll,
  getOne
};


async function getAll(req, res) {
	try{
	//get All Journal
	let list_journal=await Journal.find({journal:{$exists: true, $ne : ''}});

	const journal=[]; 
    list_journal.map(obj =>{
        let temp={};
        temp.id=obj._id;
        temp.title = obj.title;
        temp.author = obj.author;
        temp.adviser= obj.adviser;
        temp.pub_date= obj.pub_date;
        temp.topic= obj.topic;
        temp.journal= obj.journal;
        temp.poster= obj.poster;
        journal.push(temp);
        
    });

    res.status(200).send(journal);

	}catch(err){
	res.status(400).send();

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
            temp.id=journal._id;
            temp.title = journal.title;
            temp.author = journal.author;
            temp.adviser= journal.adviser;
            temp.pub_date= journal.pub_date;
            temp.topic= journal.topic;
            temp.journal= journal.journal;
            temp.poster= journal.poster;
            res.status(200).send(temp);
        }
        res.status(404).send();
        }catch(err){
        res.status(400).send();
    
        }

}
