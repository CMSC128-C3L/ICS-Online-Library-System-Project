const Sp = require('../models/Sp.js');
const Thesis = require('../models/Thesis.js');
const fs = require("fs");
const PDF = require("pdfkit");
const doc = new PDF();


module.exports = {
    getAdviserSummary,
    getAdviserSummaryPDF
};

async function getAdviserSummary(req, res) {
    try {
        const adviser = req.params.adviser;
        const thesis = await Thesis.find({type:'Thesis',adviser}); // get all of the thesis
        const sp = await Sp.find({type:"Special Problem",adviser }); // get all of the sp
        const summary = {
            adviser,
            summary : thesis.concat(sp)
        }       

        res.status(200).send(summary);   
    }catch (err) {
        res.status(400).send({message:"error",err});
    }
}

async function getAdviserSummaryPDF(req, res) {
    try {
        const adviser = req.params.adviser;
        const thesis = await Thesis.find({type:'Thesis',adviser}); // get all of the thesis
        const sp = await Sp.find({type:"Special Problem",adviser }); // get all of the sp
        
        // Writing the data into pdf file
        const stream = fs.createWriteStream(adviser +' Summary Report.pdf');
        doc.pipe(stream);
        doc.text("Adviser Summary Report ", {align: 'center'});
        doc.text(adviser, {align: 'center'});
        doc.text(" ");
        doc.text(" ");
        // Writing info of the sp
        sp.map(item => {
            doc.text("Title: " + item.title);
            doc.text("Adviser: " + item.adviser);
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
            doc.text("Adviser: " + item.adviser);
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
        
        res.status(200).send("Adviser Summary Downloaded!");   
    }catch (err) {
        res.status(400).send({message:"error",err});
    }
}
