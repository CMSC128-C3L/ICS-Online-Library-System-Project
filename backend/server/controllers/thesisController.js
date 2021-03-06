const Thesis = require('../models/Thesis.js');
const multer = require('multer');
const path = require('path');
const jwt = require("jsonwebtoken");

const storagePath = path.join(__dirname, '../uploads/thesis');
const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, storagePath);
  },
  filename: function(req, file, callback) {
    callback(null, Date.now() + '-' + file.originalname);
    
  }
});
const upload = multer({storage});
const uploadFields = upload.fields([
  { name: "thesisDocument", maxCount: 1 },
  { name: "journal", maxCount: 1 },
  { name: "poster", maxCount: 1 },
]);

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
  download,
  uploadFields,
  uploadFiles
}

async function getAll(req, res) {
  try {
    const thesis = await Thesis.find({type:'Thesis'}, createOptions(req.user.classification));
    res.status(200).send(thesis);
  } catch(error) {
    res.status(500).send();
  }
}

async function getOne(req, res) {
  try {
    const _id = req.params.id;
    const thesis = await Thesis.findOneAndUpdate({_id, type:'Thesis'}, {$inc: {view_count: 1}}).select(createOptions(req.user.classification));
    if(!thesis) return res.status(404).send();
    res.send(thesis); 
  } catch(error) {
    res.status(500).send();
  }
}

async function create(req, res) {
  try {
    const thesis = new Thesis(req.body);
    await thesis.save();
    res.status(201).send(thesis);
  } catch(error) {
    res.status(400).send();
  }
}

async function uploadFiles(req, res) {
  try {
    const _id = req.params.id;
    const uploads = req.files;

    const thesis = await Thesis.findOne({_id, type:'Thesis'});
    if(!thesis) return res.status(404).send();
    
    if(uploads.thesisDocument) 
      thesis.file = cleanDirname(uploads.thesisDocument[0].path);
    if(uploads.journal) 
      thesis.journal = cleanDirname(uploads.journal[0].path);
    if(uploads.poster) 
      thesis.poster = cleanDirname(uploads.poster[0].path);
    
    await thesis.save();
    res.status(200).send();
  } catch(error) {
    res.status(400).send();
  }
}

async function download(req, res) {
  try {
    const type = req.params.type;
    const _id = req.params.id;
    const token = req.params.token;
    const thesis = await Thesis.findOneAndUpdate({_id, type:'Thesis'}, {$inc: {download_count: 1}});
    if(!thesis) return res.status(404).send();

    const decoded = jwt.verify(token, process.env.ACCESS_JWT_SECRET);
    const notAllowed = ["Student", "Guest"];
    if(notAllowed.includes(decoded.classification)) 
      return res.status(403).send();

    let filepath;
    if(type == 0){ //poster
      if(thesis.poster === '') return res.status(404).send();
      filepath = path.join(__dirname, `/../${thesis.poster}`);
    }else if(type == 1){ //journal
      if(thesis.journal === '') return res.status(404).send();
      filepath = path.join(__dirname, `/../${thesis.journal}`);
    }else if(type ==2){ //manus
      if(thesis.file === '') return res.status(404).send();
      filepath = path.join(__dirname, `/../${thesis.file}`);
    }

    res.download(filepath);
  } catch(error) {
    res.status(500).send();
  }
}

async function update(req, res) {
  try {
    const thesisUpdate = req.body;
    const _id = req.params.id;
    const updateOptions = {
      new: true,
      runValidators:true    // for possible future validations in the model
    }
    const thesis = await Thesis.findOneAndUpdate({_id}, thesisUpdate, updateOptions);
    if(!thesis) return res.status(404).send();
    res.status(200).send(thesis);
  } catch(error) {
    res.status(400).send();
  }
}

async function deleteOne(req, res) {
  try {
    const _id = req.params.id;
    const thesis = await Thesis.findOneAndDelete({_id});
    if(!thesis) return res.status(404).send();
    res.status(200).send(thesis);
  } catch(error) {
    res.status(500).send();
  }
}

function createOptions(classification) {
  const options = {}
  const higherPrivileges = ['Faculty', 'Staff', 'Admin'];
  // If not higher privilige
  if(!(higherPrivileges.includes(classification))) {
    options.source_code = 0;
    // options.view_count = 0;
    options.download_count = 0;
    options.view_journal_count = 0;
    options.download_journal_count = 0;
  }
  // Add additional restrictions for guests
  if(classification === 'Guest') {
    options.file = 0;
    options.journal = 0;
    options.poster = 0;
  }
  return options;
}

function cleanDirname(dirname) {
  const dirToRemove = path.join(__dirname, '/../');
  const cleanedDirname = dirname.replace(dirToRemove, "");
  return cleanedDirname
  // return dirname
}
