const Book = require("../models/Book.js");
const Sp = require('../models/Sp.js');
const Journal= require('../models/Journal.js');
const Thesis = require('../models/Thesis.js');
const fs = require("fs");
const PDF = require("pdfkit");
const { CLIENT_RENEG_WINDOW } = require("tls");
const { resolve } = require("path");

module.exports = {
    getCourseSummary
};

//returns array of documents for summary report
async function getCourseSummary(req, res) {
  
    try {
        const course = req.params.course;

        const book = await Book.find({'courses.code':course}); // get all of the books
        const thesis = await Thesis.find({type:'Thesis','courses.code':course}); // get all of the thesis
        const sp = await Sp.find({type:"Special Problem",'courses.code':course}); // get all of the sp

        const summary = {
            course : course,
            summary : book.concat(thesis).concat(sp)
        }

        res.status(200).send(summary);     // respond with the array of related books/sp/thesis
    }catch (err) {
        res.status(400).send({message:"error",err});
    }
}