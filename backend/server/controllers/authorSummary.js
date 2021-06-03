const Book = require("../models/Book.js");
const Sp = require('../models/Sp.js');
const Journal= require('../models/Journal.js');
const Thesis = require('../models/Thesis.js');

module.exports = {
    getSummary
};

async function getSummary(req, res) {
    try {
        const author = req.params.author;

        // query

        // create pdf

        res.status(200);
        res.send({author:author});

    } catch (err) {
        console.log(err);
    }
}