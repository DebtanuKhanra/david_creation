const { prisma } = require("../../models/db");
const bcrypt = require("bcrypt");
const passport = require("passport");

const authController = () => {
  return {
    // render login page
    login(req, res) {
      res.render("auth/login");
    },
    // log in an user
    postLogin(req, res, next) {
      const { email, password } = req.body;
      // insufficient data
      if (!email || !password) {
        req.flash('error', "All fields are required");
        req.flash('email', email);
        return res.redirect("/login")
      }

      // authenticate
      passport.authenticate('local', (err, user, info) => {
        if (err) {
          req.flash('error', info.message);
          return next(err);
        }
        if (!user) {
          req.flash('error', info.message);
          return res.redirect("/login");
        }

        // at last log in
        req.logIn(user, (err) => {
          if (err) {
            req.flash("error", info.message);
            return next(err);
          }
          if (user.admin) {
            return res.redirect("/admin/orders");
          } else {
            return res.redirect("/orders");
          }
        })
      })(req, res, next);
    },
    // render register page
    register(req, res) {
      res.render("auth/register");
    },
    // register an user
    async postRegister(req, res) {
      const { name, email, password } = req.body;

      // insufficient data
      if (!name || !email || !password) {
        req.flash('error', "All fields are required");
        req.flash('name', name);
        req.flash('email', email);
        return res.redirect("/register")
      }

      // if user already exists
      const user = await prisma.user.findUnique({ where: { email: email } })
      console.log(user);
      if (user) {
        req.flash('error', "Email already taken");
        req.flash('name', name);
        req.flash('email', email);
        return res.redirect("/register")
      }

      // hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // create a user
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword
        }
      });
      return res.redirect("/");
    },
    logout(req, res) {
      req.logout();
      return res.redirect("/login");
    }
  }
}

module.exports = authController;
