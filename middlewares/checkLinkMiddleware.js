//file imports
import User from "../models/user.js";
import verifyToken from "../utils/verifyToken.js";

//This middleware is for reset-password
const checkLink = async (req, res, next) => {
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
    const secret = process.env.USER_FORGOTPASSWORD_SECRET + user.password;
    console.log(secret);
    const decoded = verifyToken(token, secret);
    if (!decoded) {
      const error = new Error(
        "Link expired/used go back and generate the new link"
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

export default checkLink;
