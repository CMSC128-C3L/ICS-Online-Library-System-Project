// Temporary thesis model 

const mongoose = require("mongoose");

const topics = [
  "Algorithms",
  "Android Development",
  "Computer Architecture",
  "Computer Graphics",
  "Data Structures",
  "Database Management",
  "Human-Computer Interaction",
  "Parallel Algorithms",
  "Web Development",
  "Artificial Intelligence",
  "Discrete Mathematics",
  "Machine Learning",
  "Robotics",
  "Networking",
  "Computer Security",
  "Cryptography",
  "Operating System",
  "Image Processing",
  "Distributed Computing",
  "Automata",
  "Software Engineering",
  "Special Topic",
  "Programming Languages",
  ""
];

const thesisSchema = new mongoose.Schema({
  id: Number,
  type: {
    type: String,
    default: 'Thesis'
  },
  title: {
    type: String,
    required: true,
  },
  author: [String],
  adviser: [String],
  pub_date: {
    type: Date
  },
  abstract: {
    type: String,
  },
  topic: {
    type: Array
  },
  journal: {
    type: String
  },
  poster: {
    type: String
  },
  download_count: {
   type: Number
  },
  file: {
   type: String
  },
  source_code: {
    type: String
  },
  view_count: {
    type: Number
  }
},
{collection: 'Papers'}
);

const Thesis = mongoose.model("Thesis", thesisSchema);

module.exports = Thesis;


