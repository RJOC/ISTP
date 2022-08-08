const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization && //sends token inside of header req
    req.headers.authorization.startsWith("Bearer") //bearer token
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET); //JWT_SECRET defined in .env

      //Find user in the database and return it without the password
      req.user = await User.findById(decoded.id).select("-password");

      //move on to next operation
      next();
    } catch (error) {
      //else throw error
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    //If the token is not there
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
