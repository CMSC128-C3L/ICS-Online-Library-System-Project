//This file is the entry point of the server

// import app
const app = require('./server/app.js');
// get server port from environment variables
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
});

