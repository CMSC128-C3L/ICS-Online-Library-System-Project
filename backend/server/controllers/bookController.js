const Book = require("../models/Book.js");

module.exports = {
    getAll,
    get,
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
        let _id = req.params.id;    // get id parameter
        
        // query the database
        let book = await Book.findById({_id});

        if (book === null) 
            return res.status(404).send({message:"book not found"});

        // pick the book info to be sent
        const container = {}
        container.title = book.title;
        container.author = book.author;
        container.publisher = book.publisher;
        container.year = book.year;
        container.book_cover_img = book.book_cover_img;
        container.isbn = book.isbn;
        container.topics = book.topics;

        res.status(200).send(container);

    } catch(err) {
        console.log(err);
        res.status(400).send({message:"error"});
    }
}



/*
    Returns a strip down version of a book. Removes info not needed in displaying a list of books.
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