import axios from 'axios'

const instance = axios.create({
    baseURL: '/api',
})

const api = {
    getBooks: (code) =>
    
    instance({
        'method':'GET',
        'url':'/books',
        'params': {
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