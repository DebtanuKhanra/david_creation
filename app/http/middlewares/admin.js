const admin = (req, res, next) => {
  if (req.user.admin) {
    return next();
  } else {
    return res.redirect("/");
  }
}

module.exports = admin;
