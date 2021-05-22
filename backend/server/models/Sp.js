const mongoose = require("mongoose");

const spSchema= new mongoose.Schema({
    id: Number,
    type: String,
    title: String,
    author: [String],
    adviser: String,
    pub_date: Date,
    abstract: String,
    topic: [String],

});

const Sp= mongoose.model("Special Problem",spSchema);
module.exports=Sp