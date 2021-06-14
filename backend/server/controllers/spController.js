const Sp = require('../models/Sp.js');
const multer = require('multer');
const path = require('path');
const jwt = require("jsonwebtoken");

const uploadsPath = path.join(__dirname, '../uploads/sp');
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, uploadsPath);
    },
    filename: (req, file, cb) =>{
       cb(null, file.originalname);
    }

})
const upload = multer({storage: multerStorage});

module.exports = {
  getAll,
  getOne,
  create,
  deleteSp,
  update,
  uploadSp,
  upload,
  downloadSp
};


async function getAll(req, res) {
	try{
	//get All Sp
	const sp = await Sp.find({type:"Special Problem"},restriction(req.user.classification));
   
    res.status(200).send(sp);

	}catch(err){
	res.status(400).send({message:"Error"});

	}
	
}
async function getOne(req, res) {
    console.log("GET ONE");
	try{
        //get id 
        let _id = req.params.id;    
        //get specific Sp
        let sp=await Sp.findOneAndUpdate({_id, type:"Special Problem"},{$inc: {view_count: 1}},{new: true}); //updated view_count
        sp=await Sp.findById({_id,type:"Special Problem"},restriction(req.user.classification)); //find the sp with restriction depending on user classification
        // restriction(sp.view_count);
        if(sp!=null){
            console.log(sp);
            res.status(200).send(sp);
        }else res.status(404).send({message:"Sp not found"});
    }catch(err){
    res.status(400).send({message:"Error"});

    }

}

async function create(req, res) {
    console.log(req.body);
    try{
        let new_sp= new Sp(req.body);
        await new_sp.save();
        res.status(201).send(new_sp);

    }catch(err){
        // console.log(err);
        res.status(400).send({message:"Error"});
    }
}

async function deleteSp(req, res) {
    try {
    let _id = req.params.id;
    let sp = await Sp.findOneAndDelete({_id});
    if(sp!=null){
        res.status(200).send(sp);
        return;
    }
    res.status(404).send({message:"Sp not found"});
      } catch(err) {
        res.status(500).send();
      }
}

async function update(req, res) {
    console.log(req.body);
    try{
        let _id = req.params.id;
        let query= {_id};
       
        let sp = await Sp.findOneAndUpdate({_id}, req.body, {upsert: true, new: true}); //create the updated sp or new sp if the filter cannot find the sp 
        if(sp!=null){
            res.status(200).send(sp);
            return;
        } 

        res.status(404).send();
       
        }catch(err){
            console.log(err);
            res.status(400).send({message:"Error"});
        }
        
    
}


async function uploadSp(req, res){
    try{
        let _id = req.params.id;
        let sp = await Sp.findById({_id, type:'Special Problem'});
        
        if(sp==null){
          res.status(404).send({message:"Sp not found"});
          return;
        }
       //setting the file local path
       
        if(req.files.journalFile!=null)sp.journal=cleanDirname(req.files.journalFile[0].path);
        if(req.files.posterFile!=null)sp.poster=cleanDirname(req.files.posterFile[0].path);
        if(req.files.spFile!=null)sp.file=cleanDirname(req.files.spFile[0].path);
        
        await sp.save();
      
        res.status(200).send();
    }catch(err){
        console.log(err);
        res.status(400).send({message:"Error"});
    }
}


async function downloadSp(req,res){
    try{
        let _id = req.params.id;
        const token = req.params.token;
        const decoded = jwt.verify(token, process.env.ACCESS_JWT_SECRET);
        console.log(decoded.classification);
        
        if(decoded.classification=="Guest" || decoded.classification=="Student"){
            res.status(403).send({message:"Not Authorized"});
            return;
        }

        let sp=await Sp.findOneAndUpdate({_id, type:"Special Problem"},{$inc: {download_count: 1}},{new: true});
        if(sp==null){
            res.status(404).send({message:"Sp not found"});
            return;
        }
        if(sp.file==''){
            res.status(404).send({message:"Sp file not found"});
            return;
        }
        const filepath = path.join(__dirname, `/../${sp.file}`);
        
        res.download(filepath); //download the file
        return;
        

       
    }catch(err){
        console.log(err);
        res.status(400).send({message:"Error"});
    }
}

function restriction(classification){
    const options={};
    if(classification === 'Guest' || classification === 'Student'){
        console.log(classification);
        options.file=0;
        options.source_code=0;
        options.view_count=0;
        options.download_count=0;
        options.view_journal_count = 0;
        options.download_journal_count = 0;
        if(classification === 'Guest'){
            options.journal=0;
            options.poster=0;
        }
    }
    return options;
}



function cleanDirname(dirname) {
    const dirToRemove = path.join(__dirname, '/../');
    const cleanedDirname = dirname.replace(dirToRemove, "");
    return cleanedDirname
  }
