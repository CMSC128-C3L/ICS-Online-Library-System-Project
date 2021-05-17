const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const auth = async(req, res, next) => {
  try {
    // Get the token from request authorization header
    const token = req.header("Authorization").replace("Bearer ", "");
    if(token === 'null') {
      // If there is no token, the user is not logged in
      // a not logged in user is type 3 (guest)
      req.user = {email:'guest', type:3}
    } else {
      // decode and verify jwt, throws an error if it is not valid
      const decoded = jwt.verify(token, process.env.ACCESS_JWT_SECRET);
      // get the email from the decoded token
      const email = decoded.email;
      // find the user in the database
      const user = await User.findOne({email: email, 'tokens.token': token});
      // req.user now holds the user object that can be used in authenticated routes
      req.user = user;
      req.token = token;
    }
    next();
  } catch(error) {
    // console.log(error);
    res.status(401).send({message: 'Please authenticate.'})
  }
};

module.exports = auth;