const Thesis = require('../models/Thesis.js');

module.exports = {
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
    const _id = req.params.id;
    const updateOptions = {
      new: true,
      runValidators:true    // for possible future validations in the model
    }
    const thesis = await Thesis.findOneAndUpdate({_id}, thesisUpdate, updateOptions);
    if(!thesis) return res.status(404).send();
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
    res.status(200).send(thesis);
  } catch(error) {
    // console.log(error);
    res.status(500).send();
  }
}

