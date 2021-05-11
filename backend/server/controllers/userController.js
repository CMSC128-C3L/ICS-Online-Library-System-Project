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
    // get user email 
    const email = payload.email;
    // find user in db
    let user = await User.findOne({email});
    let type; // variable to save the type of user
    // If user is not found, add a type and save to db
    if(!user) {
      const splitEmail = email.split('@');
      if(splitEmail[1] != 'up.edu.ph') type = 3; // not a up student
      else type = 2; // at least up student
      // Save email and type to db
      user = new User({email, type});
      await user.save();
    }
     // create jwt
     const token = jwt.sign(
      {
        email: user.email,
        type: user.type,
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