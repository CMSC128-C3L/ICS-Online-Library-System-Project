const Sp = require('../models/Sp.js');
const Thesis = require('../models/Thesis.js');
const fs = require("fs");
const PDF = require("pdfkit");


module.exports = {
    getAdviserSummary
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