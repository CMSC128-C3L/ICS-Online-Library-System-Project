const mongoose = require("mongoose");

const journalSchema= new mongoose.Schema({
    id: Number,
    type: Number,
    title: String,
    author: [String],
    isbn : String,
    publication: String,
    subject: [String],
});

const Journal= mongoose.model("Journal",journalSchema);
module.exports=Journal;