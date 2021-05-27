// Temporary user model for use in log in feature

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type:String,
    unique:true,
    required: true
  },
  classification: {
    type: String
  },
  profile_picture: {
    type: String
  },
  borrowedBooks: [],
  tokens: [{
    token: String
  }],
},
{collection: 'User'}
);

const User = mongoose.model("User", userSchema);

module.exports = User;