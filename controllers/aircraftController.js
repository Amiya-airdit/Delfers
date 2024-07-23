const Aircraft = require("../models/aircraft");
const { validationResult } = require("express-validator");

exports.updateAircraft = async (req, res, next) => {
  try {
    //handle validation errors using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 400;
      throw error;
    }

    const { _id } = req.user;
    const { number } = req.body;
    const aircraft = await Aircraft.findOneAndUpdate(
      { _id },
      { number },
      {
        new: true,
      }
    );

    await res
      .status(200)
      .json({ aircraft, message: "Aircraft number updated successfully" });
  } catch (err) {
    next(err);
  }
};
