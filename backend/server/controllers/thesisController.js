const Thesis = require('../models/Thesis.js');

module.exports = {
  sample,
  getAll,
  getOne,
  create,
  update,
  deleteOne
}

async function getAll(req, res) {
  try {
    const thesis = await Thesis.find({});
    console.log(thesis);
    res.status(200).send(thesis);
  } catch(error) {
    // console.log(error);
    res.status(500).send();
  }
}

async function getOne(req, res) {
  try {
    const _id = req.params.id;
    const thesis = await Thesis.find({_id});
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
    // console.log(error);
    res.status(400).send();
  }
}

async function update(req, res) {
  try {
    const thesisUpdate = req.body;
    console.log
    const _id = req.params.id;
    const updateOptions = {
      new: true,
      runValidators:true    // for possible future validations in the model
    }
    const thesis = await Thesis.findOneAndUpdate({_id}, thesisUpdate, updateOptions);
    
    res.status(200).send(thesis);
  } catch(error) {
    // console.log(error);
    res.status(400).send();
  }
}

async function deleteOne(req, res) {
  try {
    const _id = req.params.id;
    const thesis = await Thesis.findOneAndDelete({_id});
    if(!thesis) return res.status(404).send();
    res.status(200).send();
  } catch(error) {
    console.log(error);
    res.status(500).send();
  }
}
 
async function sample(req, res) {
  try {
    // sample data only!, must get from db in actual 
    const thesis = {
      title: 'Parallelizing unit test execution on GPU',
      authors: ['Taghreed Bagies'],
      year: 2020,
      abstract:'Software testing is an important stage of the software development life cycle. However, the test execution is time-consuming and costly.'
    }

    // checks the user type
    if(req.user.type === 3) {
      // If user type is 3 (guest/not logged in)
      // get the info from sample data
      const {title, authors, year} = thesis;
      // send the info as an object
      res.status(200).send({title, authors, year});
    } else {
      // Since the user is at least 2(student), send everything including abstract
      res.status(200).send(thesis);
    }
    // If there are more limitations, change what to send back per user type
  } catch(error) {
    // console.log(error)
    res.status(500).send();
  }
}

