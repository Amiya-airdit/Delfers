const User = require("../models/user");
const verifyToken = require("../utils/verifyToken");

const validateLink = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const token = req.headers.authorization;

    //find user in db
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("Invalid user id!");
      error.statusCode = 401;
      throw error;
    }

    //verifying token
    const secret = process.env.USER_LOGIN_SECRET + user.password;
    const decoded = verifyToken(token, secret);
    if (!decoded) {
      const error = new Error(
        "Your one time link is exprired, please contact admin"
      );
      error.statusCode = 401;
      throw error;
    }
    req.user = decoded;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = validateLink;
