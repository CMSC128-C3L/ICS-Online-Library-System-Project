




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