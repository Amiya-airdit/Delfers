const Aircraft = require("../models/aircraft");

exports.updateAircraft = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const check = await Aircraft.findById(_id);
    if (!check) {
      const error = new Error("Aircraft not registered");
      error.statusCode = 401;
      throw error;
    }

    const { model, manufacturer, airline, modelMedicalKits, number } = req.body;
    const aircraft = await Aircraft.findOneAndUpdate(
      { _id },
      { model, manufacturer, airline, modelMedicalKits, number },
      {
        new: true,
      }
    );

    await res
      .status(200)
      .json({ aircraft, message: "Aircraft updated successfully" });
  } catch (err) {
    next(err);
  }
};
