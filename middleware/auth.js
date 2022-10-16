const jwt = require("jsonwebtoken");
const config = require("./../config.js");
const { responseHandler } = require("../helpers/response-handler");

module.exports.verifyAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (!token) {
    return responseHandler.makeResponseError(res, 401, "token required");
  }
  jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
    if (err)
      return responseHandler.makeResponseError(
        res,
        500,
        err.message ? err.message : err.error
      );
    req.user = user;
    next();
  });
};

exports.generateAccessToken = (user) =>
  jwt.sign(user, process.env.TOKEN_SECRET, {
    expiresIn: process.env.EXPIRE_TOKEN,
  });
