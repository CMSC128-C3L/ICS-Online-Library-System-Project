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
    type: String
  },
  abstract: {
    type: String,
  },
  topic: {
    type: Array
  },
  courses: {
    type: Array
  },
  journal: {
    type: String,
    default: ''
  },
  poster: {
    type: String,
    default: ''
  },
  download_count: {
   type: Number,
   default: 0
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
  view_journal_count: {
    type: Number,
    default: 0
  },
  download_journal_count: {
    type: Number,
    default: 0
  }
},
{collection: 'Papers'}
);

const Thesis = mongoose.model("Thesis", thesisSchema);

module.exports = Thesis;


