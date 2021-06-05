// Temporary book model

const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  id : {
    type: Number
  },
  isbn: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  author: [String],
  book_cover_img: {
    type: String,
    default: ""
  },
  year: {
    type: Number,
    required: true
  },
  publisher: {
    type: String,
    required: true
  },
  view_count: {
    type: Number,
    default: 0
  },
  download_count: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: "Book"
  },
  courses: [],
  topic: [String]
},
{ collection: 'Books' }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;