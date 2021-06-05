const mongoose = require("mongoose");

const journalSchema= new mongoose.Schema({
    id: Number,
    type: String,
    title: String,
    author: [String],
    adviser: [String],
    pub_date: String,
    topic: [String],
    journal: String,
   	poster: String,
    view_count: Number,
    download_count: Number
},{
    collection: 'Papers'
}
);

const Journal=mongoose.model("Journal",journalSchema);
module.exports=Journal;