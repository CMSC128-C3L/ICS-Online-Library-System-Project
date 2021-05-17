// Temporary user model for use in log in feature

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type:String,
    unique:true,
    required: true
  },
  type: {
    type: Number,
    required: true
  },
  tokens: [{
    token: String
  }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;