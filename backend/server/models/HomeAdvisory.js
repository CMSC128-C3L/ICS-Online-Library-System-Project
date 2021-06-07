const mongoose = require("mongoose");

const homeAdvisorySchema= new mongoose.Schema({
    header: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    date_added: String,
    image: String
     

},{
    collection: 'HomeAdvisory'
}
);

const homeAdvisory= mongoose.model("HomeAdvisory",homeAdvisorySchema);
module.exports=homeAdvisory;