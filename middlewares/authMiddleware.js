const verifyToken = require("../utils/verifyToken");
const loginTypes = require("../utils/loginTypes");

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const { loginType } = req.body;

    if (!token) {
      const error = new Error("No token provided");
      error.statusCode = 403;
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
      const error = new Error("Failed to authenticate, please login again");
      error.statusCode = 500;
      throw error;
    }

    req.user = decoded;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = isAuth;
