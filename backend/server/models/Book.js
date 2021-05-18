// Temporary book model

const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  id: Number,
  isbn: String,
  title: String,
  author: String,
  book_cover_img: String,
  year: Number,
  publisher: String,
  view_count: Number,
  subject: [String],
  topic: [String],
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;