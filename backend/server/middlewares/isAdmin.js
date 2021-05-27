const isAdmin = (req, res, next) => {
  console.log(req.user.classification);
  if(req.user.classification !== 'Admin') {
    return res.status(403).send();
  }
  next();
}

module.exports = isAdmin;