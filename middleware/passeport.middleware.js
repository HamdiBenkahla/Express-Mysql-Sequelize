const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const { owner } = require("../db/db.js");
const { responseHandler } = require("../helpers/response-handler");
const { generateAccessToken } = require("./auth.js");

//function response used in both signup and login
const middlewareResponse = (err, user, info, res, loggedIn) => {
  if (err) {
    return responseHandler.makeResponseError(res, 401, err);
  }
  if (!user) {
    return responseHandler.makeResponseError(res, 401, info);
  }
  loggedIn(user, (_) => {
    const param = {
      access_token: user.token,
      id: user.id,
      ...(user.message && { message: user.message }),
    };
    return responseHandler.makeResponseData(res, 200, "success", param);
  });
};

/*
 * begin signup with email and password
 */
passport.use(
  "auth_signup_emailStrategy",
  new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      let user = await owner.findOne({
        where: { email: username },
      });
      if (user) {
        return done(null, { message: "email already in use" });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        let createdUser = await owner.create({
          email: username,
          password: hashPassword,
        });
        let token = generateAccessToken(createdUser.toJSON());
        return done(null, {
          userId: createdUser.id,
          token,
        });
      }
    }
  )
);

exports.emailSignup = async (req, res, next) => {
  passport.authenticate("auth_signup_emailStrategy", (err, user, info) => {
    middlewareResponse(err, user, info, res, req.logIn);
  })(req, res, next);
};
/*
 * end signup with email and password
 */

/*
 * begin signin with email and password
 */

const signinWithEmail = async (req, username, password, done) => {
  let user = await owner.findOne({
    where: { email: username },
  });
  if (!user) return done(null, false, { message: "user not found" });
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return done(null, false, { message: "invalid password" });
  let token = generateAccessToken(user.toJSON());
  return done(null, {
    userId: user.id,
    token,
  });
};
passport.use(
  "signinEmailStrategy",
  new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      await signinWithEmail(req, username, password, done);
    }
  )
);

exports.emailConnection = async (req, res, next) => {
  passport.authenticate(
    "signinEmailStrategy",
    { session: false },
    (err, user, info) => {
      middlewareResponse(err, user, info, res, req.logIn);
    }
  )(req, res, next);
};
/*
 * end signin with email and password
 */
