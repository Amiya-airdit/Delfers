const jwt = require("jsonwebtoken");

const generateToken = (user, secret, expiresIn) => {
  const plainObj = {
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    userType: user.userType,
    password: user.password,
    companyName: user.companyName,
    isDeleted: user.isDeleted,
    fresh: user.fresh,
  };

  return jwt.sign(plainObj, secret, {
    expiresIn: expiresIn,
  });
};

module.exports = generateToken;
