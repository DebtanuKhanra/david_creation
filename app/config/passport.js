const LocalStrategy = require("passport-local").Strategy;
const { prisma } = require("../models/db");
const bcrypt = require("bcrypt");

const init = (passport) => {
  passport.use(new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    // login
    // check if user exists
    const user = await prisma.user.findUnique({ where: { email: email } });
    if (!user) {
      return done(null, false, { message: "No user with this email" });
    }

    bcrypt.compare(password, user.password).then(match => {
      if (match) {
        return done(null, user, { message: "Logged in successfully" });
      }
      return done(null, false, { message: "Wrong username or password" })
    }).catch(err => {
      return done(null, false, { message: "Something went wrong" })
    })
  }))

  passport.serializeUser((user, done) => {
    done(null, user.id);
  })

  passport.deserializeUser(async (id, done) => {
    const u = await prisma.user.findUnique({ where: { id: id } });
    if (u) {
      done(null, u);
    } else {
      done("User not found", {});
    }
  })
}

module.exports = init;
