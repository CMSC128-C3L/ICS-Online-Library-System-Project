const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  code: String,
  title: String,
  description: String,
  units: Number,
  prerequisites: []
},
{ collection: 'Courses' }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;