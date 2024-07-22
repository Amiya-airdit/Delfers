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
      throw new Error("Unknown type to generate token!");
  }

  return jwt.sign(plainObj, secret, {
    expiresIn: expiresIn,
  });
};

module.exports = generateToken;
