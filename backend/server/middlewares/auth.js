const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const auth = async(req, res, next) => {
  try {
    // Get the token from request authorization header
    const authHeader = req.header("Authorization");
    if(!authHeader) {
      // If there is no token, the user is not logged in a not logged in user is a guest
      req.user = {classification: 'Guest'};
      next();
    } else {
      const token = authHeader.replace("Bearer ", "");
      // decode and verify jwt, throws an error if it is not valid
      const decoded = jwt.verify(token, process.env.ACCESS_JWT_SECRET);
      // get the email from the decoded token
      const email = decoded.email;
      // find the user in the database
      const user = await User.findOne({email: email, 'tokens.token': token});
      if(!user) throw new Error();
      // req.user now holds the user object that can be used in authenticated routes
      req.user = user;
      req.token = token;
      next();
    }
  } catch(error) {
    console.log(error);
    res.status(401).send({message: 'Please authenticate.'})
  }
};

module.exports = auth;