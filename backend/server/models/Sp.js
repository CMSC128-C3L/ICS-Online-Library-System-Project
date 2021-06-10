const mongoose = require("mongoose");

const spSchema= new mongoose.Schema({
    id: Number,
    type: String, 
    title: {
        type: String,
        required: true,
    },
    author: [String],
    adviser: [String],
    pub_date: {
        type: String,
        required: true,
    },
    abstract: String,
    topic: [String],
    journal: {
        type: String,
        default: ''
    },
    poster: {
        type: String,
        default: ''
    },
    file: {
        type: String,
        default: ''
    },
    source_code: {
        type: String,
        default: ''
    },
    view_count: {
        type: Number,
        default: 0
    },
    download_count: {
        type: Number,
        default: 0
    },
    view_journal_count: {
        type: Number,
        default: 0
    },
    download_journal_count: {
        type: Number,
        default: 0
    },
    courses: []

},{
    collection: 'Papers'
}
);

const Sp= mongoose.model("Special Problem",spSchema);
module.exports=Sp;