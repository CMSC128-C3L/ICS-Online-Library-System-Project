const HomeAdvisory = require('../models/HomeAdvisory.js');
const multer = require('multer');
const path = require("path");


// This will be used in router.js as middleware for the thumbnail of the home advisories
const storage = multer.diskStorage({
  destination: function(req, file, callback) {
      callback(null, path.join(__dirname, '../uploads/home_advisory'));
  },
  filename: function(req, file, callback) {
      callback(null, "s-" + Date.now() + "-" + file.originalname);
  }
});
const uploads = multer({ storage }).single('home_advisory');


module.exports = {
  getAll,
  getOne,
  update,
  uploadThumbnail,
  uploads,
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



// route for uploading a thumbnail image to a HomeAdvisory
async function uploadThumbnail(req, res) {
  try {
    const _id = req.params.id;  // the id of the HomeAdvisory to be updated
    const thumbnail = req.file;

    if (!thumbnail)
        return res.status(400).send({message:"missing thumbnail"});

    // update the path of the thumbnail attribute of the HomeAdvisory
    await HomeAdvisory.findOneAndUpdate(
      {_id},
      {image: thumbnail.filename},
    );

    res.status(200).send({_id});
  } catch(err) {
    console.log(err);
    res.status(40).send({message: "error"});
  }
}