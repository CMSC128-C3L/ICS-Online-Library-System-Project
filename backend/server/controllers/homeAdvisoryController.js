




//




//
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


// route for uploading a thumbnail image to a HomeAdvisory
async function uploadThumbnail(req, res) {
    try {
        const _id = req.params.id;  // the id of the HomeAdvisory to be updated
        const thumbnail = req.file;

        if (!thumbnail)
            return res.status(400).send({message:"missing thumbnail"});

        // update the path of the thumbnail attribute of the HomeAdvisory
        // TODO: update the HomeAdvisory and use the model


        res.status(200).send({message:"thumbail saved"});
    } catch(err) {
        res.status(400).send({message: "error"});
    }
}