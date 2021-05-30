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
        type: Date,
        required: true,
    },
    abstract: String,
    topic: [String],
    journal: String,
    poster: String

},{
    collection: 'Papers'
}
);

const Sp= mongoose.model("Special Problem",spSchema);
module.exports=Sp;