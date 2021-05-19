const Book = require("../models/Book.js");

module.exports = {
    getAll,
    get,
    create,
};

// Get all Books
async function getAll(req, res) {
    try {
        const data = await Book.find({});   // get all of the books
        const book = data.map(item => bookBase(item));
        res.status(200).send(book);
        
    } catch (err) {
        console.log(err);
        res.status(400).send({message:"error"});
    }
}


// Get a specific book
async function get(req, res) {
    try {
        const _id = req.params.id;    // get id parameter
        const data = await Book.findById({_id});  // query the database

        if (data === null) 
            return res.status(404).send({message:"book not found"});    // specified book does not exist

        const book = bookBase(data);
        res.status(200).send(book);

    } catch(err) {
        console.log(err);
        res.status(400).send({message:"error"});
    }
}


// Create a new book
async function create(req, res) {
    try {
        if (req.user.classification === "Admin") {
            const book = new Book(req.body);
            const newBook = await book.save();
            return res.status(201).send(newBook._id);
        }

        res.status(403).send({message:"not admin"});

    } catch (err) {
        console.log(err);
        res.status(400).send({message:"error"});
    }
}

/*
    Returns a strip down version of a book, removing info that is not
    needed in displaying a book.
*/
function bookBase(data) {
    const book = {}
    book.title = data.title;
    book.year = data.year;
    book.author = data.author;
    book.isbn = data.isbn;
    book.book_cover_img = data.book_cover_img;
    book.topics = data.topics;

    return book;
}