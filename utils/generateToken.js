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
        companyName: object.companyName,
        isDeleted: object.isDeleted,
        fresh: object.fresh,
      };
      break;
    case "aircraft":
      plainObj = {
        _id: object._id.toString(),
        model: object.model,
        manufacturer: object.manufacturer,
        airline: object.airline,
        modelMedicalKits: object.modelMedicalKits,
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
