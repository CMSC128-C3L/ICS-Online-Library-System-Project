const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User.js');

// Used in verifying google log in
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

module.exports = {
  login,
  logout
}

async function login(req, res) {
  // get the id token from request body
  const { id_token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();
    // get user name, email 
    const { name, email } = payload;
    // find user in db
    let user = await User.findOne({email});
    let classification; // variable to save the classification of user
    // If user is not found, add a classification and save to db
    if(!user) {
      const splitEmail = email.split('@');
      // not a up mail
      if(splitEmail[1] !== 'up.edu.ph') return res.status(401).send();
      else classification = "Student"; // at least up student
      // Save email and classification to db
      user = new User({name, email, classification});
      await user.save();
    }
     // create jwt
     const token = jwt.sign(
      {
        email: user.email,
        classification: user.classification,
        picture: payload.picture,
        given_name: payload.given_name,
        family_name: payload.family_name
      },
      process.env.ACCESS_JWT_SECRET,
      { expiresIn: '1d' });
    // save token to user
    user.tokens = user.tokens.concat({token});
    await user.save();
    // send token to request
    // console.log({token});
    res.status(200).send({token});
  } catch(error) {
    console.log(error)
    res.status(400).send();
  }
}

async function logout(req, res) {
  try {
    // remove current token from user tokens
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    });
    // save user and send status 200
    await req.user.save();
    res.status(200).send();
    
  } catch(error) {
    // console.log(error);
    res.status(500).send();
  }
}