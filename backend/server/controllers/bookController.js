const Book = require("../models/Book.js");

module.exports = {
    getAll,
    get,
};

// Get all Books
async function getAll(req, res) {
    try {
        // get all of the books
        let data = await Book.find({});
        
        // send only the needed information for the guest user
        const arr = data.map(item => {
            const container = {}
            
            container.title = item.title;
            container.author = item.author;
            container.publisher = item.publisher;
            container.year = item.year;
            container.book_cover_img = item.book_cover_img;
            container.isbn = item.isbn;
            container.topics = item.topics;

            return container;
        });
        res.status(200).send(arr);
        
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