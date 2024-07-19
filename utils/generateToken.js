const jwt = require("jsonwebtoken");

const generateToken = (object, type, secret, expiresIn) => {
  let plainObj;
  switch (type) {
    case "user":
      plainObj = {
        _id: object._id.toString(),
        name: object.name,
        email: object.email,
        userType: object.userType,
        password: object.password,
        companyName: object.companyName,
        isDeleted: object.isDeleted,
        fresh: object.fresh,
      };
      break;
    case "aircraft":
      plainObj = {
        _id: object._id.toString(),
        number: object.number,
      };
      break;
    default:
      const error = new Error("Invalid type");
      error.statusCode = 401;
      throw error;
  }

  return jwt.sign(plainObj, secret, {
    expiresIn: expiresIn,
  });
};

module.exports = generateToken;
