const HomeAdvisory = require('../models/HomeAdvisory.js');

module.exports = {
  getAll,
  getOne,
  update,
}

async function getAll(req, res) {
  try {
    const advisories = await HomeAdvisory.find();
    res.status(200).send(advisories);
  } catch(error) {
    // console.log(error);
    res.status(500).send();
  }
}

async function getOne(req, res) {
  try {
    const _id = req.params.id;
    const advisory = await HomeAdvisory.findOneAndUpdate({_id});
    if(!advisory) return res.status(404).send();
    res.send(advisory); 
  } catch(error) {
    console.log(error);
    res.status(500).send();
  }
}

async function update(req, res) {
  try {
    const homeAdvisory = req.body;
    const _id = req.params.id;
    const updateOptions = {
      new: true,
      runValidators:true,
    }

    const advisory = await HomeAdvisory.findOneAndUpdate({_id}, homeAdvisory, updateOptions);
    if(!advisory) return res.status(404).send();
    res.status(200).send(advisory);
  } catch(error) {
    // console.log(error);
    res.status(400).send();
  }
}


//




//