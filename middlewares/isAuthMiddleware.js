//file imports
import verifyToken from "../utils/verifyToken.js";
import { loginTypes } from "../utils/loginTypes.js";

//This middleware to check whether user is loggedin or not
const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const { loginType } = req.body;

    if (!token) {
      const error = new Error("Authentication token not provided");
      error.statusCode = 401;
      throw error;
    }

    if (!loginType || loginType.length < 0 || !loginTypes.includes(loginType)) {
      const error = new Error("No login type provided or incorrect");
      error.statusCode = 400;
      throw error;
    }

    let secret;
    const index = loginTypes.indexOf(loginType);
    if (loginTypes[index] === "user-login") {
      secret = process.env.USER_LOGIN_SECRET;
    } else if (loginTypes[index] === "aircraft-login") {
      secret = process.env.AIRCRAFT_LOGIN_SECRET;
    }

    const decoded = verifyToken(token, secret);
    if (!decoded) {
      const error = new Error("Your session expired, please login again");
      error.statusCode = 401;
      throw error;
    }

    req.user = decoded;
    next();
  } catch (err) {
    next(err);
  }
};

export default isAuth;
