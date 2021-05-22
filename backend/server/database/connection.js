const mongoose = require('mongoose');

const uri = "mongodb+srv://admin:admin@database.61lmf.mongodb.net/db?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true
})

.then(() => {
  console.log("MongoDB Connected…")
})
.catch(err => console.log(err))