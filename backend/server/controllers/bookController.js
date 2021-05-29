const Book = require("../models/Book.js");

module.exports = {
    getAll,
    get,
    create,
    update,
    deleteBook,
};

// Get all Books
async function getAll(req, res) {
    try {
        const data = await Book.find({});   // get all of the books
        const book = data.map(item => bookBase(item));
        res.status(200).send(book);     // respond with the array of books
        
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
        book.description = data.description;
        res.status(200).send(book);     // respond with specified book

    } catch(err) {
        console.log(err);
        res.status(400).send({message:"error"});
    }
}


// Create a new book
async function create(req, res) {
    try {
        const book = new Book(req.body);    // get the book data from the request body
        const newBook = await book.save();  // insert the book
        return res.status(201).send(newBook._id);   // responsd with the id of the new book

    } catch (err) {
        console.log(err);
        res.status(400).send({message:"error"});
    }
}


// Update a specified book
async function update(req, res) {
    try {
        const book = req.body;      // get the new data of the book from the request body
        const _id = req.params.id;  // get the id of the book to be updated

        const newBook = await Book.findOneAndUpdate({_id}, book, {new:true});
        if (newBook === null)
            return res.status(404).send({message:"book not found"});    // the specified book does not exist
    
        return res.status(200).send(bookBase(newBook));   // respond with the updated book  

    } catch (err) {
        console.log(err);
        res.status(400).send({message:"error"});
    }
}



// Delete a specified book
async function deleteBook(req, res) {
    try {
        const _id = req.params.id;  // get the id of the book to be deleted
        const deleted = await Book.findOneAndDelete({_id});
        if (deleted === null)
            return res.status(404).send({message:"book not found"});    // the specified book does not exist

        return res.status(200).send({message:"book deleted"});  // send ok response        

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
    book._id = data._id
    book.title = data.title;
    book.year = data.year;
    book.author = data.author;
    book.isbn = data.isbn;
    book.book_cover_img = data.book_cover_img;
    book.topic = data.topic;
    book.course_code = data.courses.map(getCourseCode);

    return book;
}

function getCourseCode(data){
    return data.code;
}