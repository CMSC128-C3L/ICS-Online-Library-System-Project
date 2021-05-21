import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline',
})

// rename sample makeup to copy specified books document
const renameKey = (obj, oldKey, newKey) => {
    obj[newKey] = obj[oldKey]
    delete obj[oldKey]
}

export default {
    getAllBooks: () =>
    instance({
        'method':'GET',
        'url':'/query',
        'params':{
            'brand':'maybelline'
        },

        // transform makeup response to books
        // delete na lang pag oks na database
        transformResponse: [function(makeup) {
            console.log("Transforming tols")
            const products = JSON.parse(makeup)
            products.forEach(obj => {

                // rename makeup keys to follow name of book keys
                // as defined in the database document
                renameKey(obj, 'product_link', 'isbn')
                renameKey(obj, 'name', 'title')
                renameKey(obj, 'brand','author')
                renameKey(obj, 'image_link', 'book_cover_img')
                renameKey(obj, 'created_at', 'year')
                renameKey(obj, 'product_type', 'publisher')
                renameKey(obj, 'rating', 'view_count')
                renameKey(obj, 'price', 'download_count')
                renameKey(obj, 'product_colors', 'subject')
                renameKey(obj, 'tag_list', 'topic')
            })

            return products
        }],
    })
}