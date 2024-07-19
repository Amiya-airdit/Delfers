const verifyToken = require("../utils/verifyToken");

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      const error = new Error("No token provided");
      error.statusCode = 403;
      throw error;
    }

    const decoded = verifyToken(token, process.env.USER_LOGIN_SECRET);
    if (!decoded) {
      const error = new Error(
        "Failed to authenticate token, please login again"
      );
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
