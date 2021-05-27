const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User.js');

// Used in verifying google log in
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

module.exports = {
  login,
  logout,
  getAll,
  getOne,
  update,
  deleteOne
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
    const { name, email, picture } = payload;
    // find user in db
    let user = await User.findOne({email});
    let classification; // variable to save the classification of user
    let profile_picture = picture;
    // If user is not found, add a classification and save to db
    if(!user) {
      const splitEmail = email.split('@');
      // not a up mail
      if(splitEmail[1] !== 'up.edu.ph') return res.status(401).send();
      else classification = "Student"; // at least up student
      // Save email and classification to db
      user = new User({name, email, classification, profile_picture});
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

async function getAll(req, res) {
  const findOptions = {
    tokens: 0
  }
  try {
    const allUsers = await User.find({}, findOptions);
    res.status(200).send(allUsers);
  } catch(error) {
    res.status(500).send();
  }
}

async function getOne(req, res) {
  const findOptions = {
    tokens: 0
  }
  try {
    const _id = req.params.id;
    const user = await User.find({_id}, findOptions);
    if(!user) return res.status(404).send();
    res.status(200).send(user);
  } catch(error) {
    res.status(500).send();
  }
}

async function update(req, res) {
  try {
    const userUpdate = req.body;
    const _id = req.params.id;
    const updateOptions = {
      new: true
    };
    const updatedUser = await User.findOneAndUpdate(
      {_id}, 
      userUpdate, 
      updateOptions
      ).select("-tokens");
    if(!updatedUser) return res.status(404).send();
    res.status(200).send(updatedUser);
  } catch(error) {
    res.status(400).send();
  }
}

async function deleteOne(req, res) {
  try {
    const _id = req.params.id;
    const deletedUser = await User.findOneAndDelete({_id}).select("-tokens");
    if(!deletedUser) return res.status(404).send();
    res.status(200).send(deletedUser);
  } catch(error) {
    res.status(500).send();
  }
}