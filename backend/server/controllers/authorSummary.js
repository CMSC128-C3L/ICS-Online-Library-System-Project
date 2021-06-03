const Book = require("../models/Book.js");
const Sp = require('../models/Sp.js');
const Journal= require('../models/Journal.js');
const Thesis = require('../models/Thesis.js');
const fs = require("fs");
const PDF = require("pdfkit");
const doc = new PDF();


module.exports = {
    getSummary
};

async function getSummary(req, res) {
    try {
        const author = req.body.author;
        try {
            const book = await Book.find({author}); // get all of the books
            const thesis = await Thesis.find({type:'Thesis',author}); // get all of the thesis
            const sp = await Sp.find({type:"Special Problem",author }); // get all of the sp
            
            // Writing the data into pdf file
            doc.pipe(fs.createWriteStream('file.pdf'));
            doc.text(author);
            doc.text(" ");
            book.map(item => {
                doc.text(item.title);
                doc.text(item.year);
                doc.text(item.type);
                item.topic.map(tpc => {
                    doc.text(tpc);
                });
                doc.text(" ");
            });
            sp.map(item => {
                doc.text(item.title);
                const editedDate = String(item.pub_date);
                const strippedDate = editedDate.split(" ");
                doc.text(strippedDate[1] + " " + strippedDate[2] + ", " + strippedDate[3]);
                doc.text(item.type);
                item.topic.map(tpc => {
                    doc.text(tpc);
                });
                doc.text(" ");
            });
            thesis.map(item => {
                doc.text(item.title);
                const editedDate = String(item.pub_date);
                const strippedDate = editedDate.split(" ");
                doc.text(strippedDate[1] + " " + strippedDate[2] + ", " + strippedDate[3]);
                doc.text(item.type);
                item.topic.map(tpc => {
                    doc.text(tpc);
                });
                doc.text(" ");
            });
            doc.end();

            res.status(200).send("ok");     // respond with the array of books 
        }catch (err) {
            res.status(400).send({message:"error"});
        }

        // res.status(200);
        // res.send({author});

    } catch (err) {
        console.log(err);
    }
}
