import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://60a7910e3b1e13001717684a.mockapi.io/api/books/books',
})

// Rename sample makeup to copy specified books document
const renameKey = (obj, oldKey, newKey) => {
    obj[newKey] = obj[oldKey]
    delete obj[oldKey]
}

const api = {
    getBooks: (code) =>
    
    instance({
        'method':'GET',
        // 'url':'/query',
        'params':{
            'course_code': code
        },
    }),

    getCourse: (code) =>

    instance({
        'method':'GET',
        'params':{
            'course_code': code
        }
    })
}

export default api