const isAdmin = (req, res, next) => {
  if(req.user.classification !== 'Admin') {
    return res.status(403).send();
  }
  next();
}

module.exports = isAdmin;