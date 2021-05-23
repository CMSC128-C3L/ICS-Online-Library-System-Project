const mongoose = require('mongoose');

const uri = "mongodb+srv://admin:admin@database.61lmf.mongodb.net/db?retryWrites=true&w=majority";
// sample local: process.env.MONGODB_URL

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})

.then(() => {
  console.log("MongoDB Connected…")
})
.catch(err => console.log(err))