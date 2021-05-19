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
  type: {
    type: String,
    default: 'Thesis'
  },
  title: {
    type: String,
    required: true,
  },
  authors: [{
    author: {
      type: String,
      required: true,
    }
  }],
  adviser: {
    type: String,
    required: true,
  },
  pub_date: {
    type: Date,
    required: true,
  },
  abstract: {
    type: String,
  },
  topic: {
    type: String,
    enum: topics
  }
});

const Thesis = mongoose.model("Thesis", thesisSchema);

module.exports = Thesis;


