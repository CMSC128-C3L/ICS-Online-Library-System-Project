const Book = require("../models/Book.js");
const Sp = require('../models/Sp.js');
const Journal= require('../models/Journal.js');
const Thesis = require('../models/Thesis.js');
const fs = require("fs");
const PDF = require("pdfkit");



module.exports = {
    getAuthorSummary
};

async function getAuthorSummary(req, res) {
    try {
        
        const author = req.params.author;
        const book = await Book.find({author}); // get all of the books
        const thesis = await Thesis.find({type:'Thesis',author}); // get all of the thesis
        const sp = await Sp.find({type:"Special Problem",author }); // get all of the sp

        const summary = {
            author,
            summary: book.concat(thesis).concat(sp)
        };
        

        res.status(200).send(summary);   
    }catch (err) {
        res.status(400).send({message:"error",err});
    }
}
