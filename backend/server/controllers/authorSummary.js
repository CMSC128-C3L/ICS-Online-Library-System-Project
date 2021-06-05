const Book = require("../models/Book.js");
const Sp = require('../models/Sp.js');
const Journal= require('../models/Journal.js');
const Thesis = require('../models/Thesis.js');
const fs = require("fs");
const PDF = require("pdfkit");



module.exports = {
    getAuthorSummary,
    getAuthorSummaryPDF
};

async function getAuthorSummaryPDF(req, res) {
       
    try {
        const author = req.params.author;
        const book = await Book.find({author}); // get all of the books
        const thesis = await Thesis.find({type:'Thesis',author}); // get all of the thesis
        const sp = await Sp.find({type:"Special Problem",author }); // get all of the sp
        
        // Writing the data into pdf file
        const doc = new PDF();
        const stream = fs.createWriteStream(author +' Summary Report.pdf');
        doc.pipe(stream);
        doc.text("Author Summary Report ", {align: 'center'});
        doc.text(author, {align: 'center'});
        doc.text(" ");
        doc.text(" ");
        // Writing info of the book
        book.map(item => {
            doc.text("Title: " + item.title);
            doc.text("Author: " + item.author);
            doc.text("Year: " + item.year);
            doc.text("Type: " + item.type);
            doc.text("ISBN: " + item.isbn);
            doc.text("Topics: ");
            item.topic.map(tpc => {
                doc.text("\u0020 " + tpc);
            });
            doc.text(" ");
        });
        // Writing info of the sp
        sp.map(item => {
            doc.text("Title: " + item.title);
            doc.text("Author: " + item.author);
            doc.text("Adviser: " + item.adviser);
            const editedDate = String(item.pub_date);
            const strippedDate = editedDate.split(" ");
            doc.text("Publication Date: " + strippedDate[1] + " " + strippedDate[2] + ", " + strippedDate[3]);
            doc.text("Type: " + item.type);
            doc.text("Topics: ");
            item.topic.map(tpc => {
                doc.text("\u0020 " + tpc);
            });
            doc.text(" ");
        });
        // Writing info of the thesis
        thesis.map(item => {
            doc.text("Title: " + item.title);
            doc.text("Author: " + item.author);
            doc.text("Adviser: " + item.adviser);
            const editedDate = String(item.pub_date);
            const strippedDate = editedDate.split(" ");
            doc.text("Publication Date: " + strippedDate[1] + " " + strippedDate[2] + ", " + strippedDate[3]);
            doc.text("Type: " + item.type);
            doc.text("Topics: ");
            item.topic.map(tpc => {
                doc.text("\u0020 " + tpc);
            });
            doc.text(" ");
        });
        doc.end();
        
        
        res.status(200).send("Author Summary Downloaded!");   
    }catch (err) {
        res.status(400).send({message:"error",err});
    }
}

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
