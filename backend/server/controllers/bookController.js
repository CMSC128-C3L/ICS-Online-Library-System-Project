const Book = require("../models/Book.js");

module.exports = {
    getAll,
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
