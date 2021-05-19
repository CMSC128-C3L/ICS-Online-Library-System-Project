const Sp= require('./models/Sp.js');

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
    let user_type=req.user.type;

    switch(user_type){ //student and guest can't access sp
        case 3: //guest (3)
            res.status(401).send({message: "The user is Unauthorized in this section"}); 
            break;
        case 2: //student (2)
            res.status(401).send({message: "The user is Unauthorized in this section"});
            break;
    }

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
        let user_type=req.user.type;

        switch(user_type){ //student and guest can't access sp
        case 3: //guest (3)
            res.status(401).send({message: "The user is Unauthorized in this section"}); 
            break;
        case 2: //student (2)
            res.status(401).send({message: "The user is Unauthorized in this section"});
            break;
        }
        
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



