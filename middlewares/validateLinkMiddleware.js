//file imports
import User from "../models/user.js";
import verifyToken from "../utils/verifyToken.js";

//This middleware is for fresh user set password
const validateLink = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const token = req.headers.authorization;

    if (!token) {
      const error = new Error("Authentication token not provided");
      error.statusCode = 401;
      throw error;
    }

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
        "Your one time link is expired, please contact admin"
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

export default validateLink;
