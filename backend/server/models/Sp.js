const mongoose = require("mongoose");

const spSchema= new mongoose.Schema({
    id: Number,
    type: Number,
    title: String,
    author: [String],
    adviser: String,
    pub_date: Date,
    abstract: String,
    topic: [String],

});

const Sp= mongoose.model("ScientificPapers",spSchema);
module.exports=Sp;