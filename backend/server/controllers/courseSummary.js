const Book = require("../models/Book.js");
const Sp = require('../models/Sp.js');
const Journal= require('../models/Journal.js');
const Thesis = require('../models/Thesis.js');
const fs = require("fs");
const PDF = require("pdfkit");
const doc = new PDF();


module.exports = {
    getCourseSummary,
    getCourseSummaryPDF
};

//returns array of documents for summary report
async function getCourseSummary(req, res) {
    try {
        const course = req.body.course;
        try {
            const book = await Book.find({'courses.code':course}); // get all of the books
            const thesis = await Thesis.find({type:'Thesis','courses.code':course}); // get all of the thesis
            const sp = await Sp.find({type:"Special Problem",'courses.code':course}); // get all of the sp

            const summary = book.concat(thesis).concat(sp);

            res.status(200).send(summary);     // respond with the array of related books/sp/thesis
        }catch (err) {
            res.status(400).send({message:"error"});
        }
    } catch (err) {
        console.log(err);
    }
}

//converts the summary report to pdf format
async function getCourseSummaryPDF(req, res){
    try {
        const course = req.body.course;
        try {
            const book = await Book.find({'courses.code':course}); // get all of the books
            const thesis = await Thesis.find({type:'Thesis','courses.code':course}); // get all of the thesis
            const sp = await Sp.find({type:"Special Problem",'courses.code':course}); // get all of the sp
        
            // Writing the data into pdf file
            doc.pipe(fs.createWriteStream('course-file.pdf'));
            doc.text("Course Summary Report ", {align: 'center'});
            doc.text(course, {align: 'center'});
            doc.text(" ");
            doc.text(" ");
            book.map(item => {
                doc.text("Title: " + item.title);
                doc.text("Author: " + item.author);
                doc.text("Year: " + item.year);
                doc.text("Type: " + item.type);
                doc.text("ISBN: " + item.isbn);
                doc.text("Topics: ");
                item.topic.map(tpc => {
                    doc.text(tpc);
                });
                doc.text(" ");
            });
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
                    doc.text(tpc);
                });
                doc.text(" ");
            });
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
                    doc.text(tpc);
                });
                doc.text(" ");
            });
            doc.end();

            res.status(200).send("ok");     // respond with ok
        }catch (err) {
            res.status(400).send({message:"error"});
        }
    } catch (err) {
        console.log(err);
    }
}


