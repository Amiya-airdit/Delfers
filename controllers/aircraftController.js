const mongoose = require("mongoose");

const Aircraft = require("../models/aircraft");

exports.getAllAircrafts = async (req, res, next) => {
  try {
    const filter = req.query.$filter;
    if (!filter) {
      const error = new Error("No filter provided to get aircrafts");
      error.statusCode = 400;
      throw error;
    }

    const [field, operator, value] = filter.split("-");
    if (field === "airline" && operator === "eq") {
      const airlineId = value;
      const aircrafts = await Aircraft.find({ airline: airlineId });
      return res
        .status(200)
        .json({ aircrafts, message: "Fetched aircrafts successfully" });
    }
  } catch (err) {
    next(err);
  }
};

exports.updateAircraft = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { model, manufacturer, airline, modelMedicalKits, number } = req.body;

    if (!model && !manufacturer && !airline && !modelMedicalKits && !number) {
      const error = new Error("No data provided to update");
      error.statusCode = 400;
      throw error;
    }

    const updateData = {};
    if (model && model.trim() !== "") updateData.model = model.trim();
    if (manufacturer && manufacturer.trim() === "")
      updateData.manufacturer = manufacturer.trim();
    if (airline && airline.trim() !== "") updateData.airline = airline.trim();
    if (number && number.trim() !== "") updateData.number = number.trim();

    if (modelMedicalKits) {
      updateData.$addToSet = {
        modelMedicalKits: {
          $each: modelMedicalKits.map((id) => new mongoose.Types.ObjectId(id)),
        },
      };
    }

    const aircraft = await Aircraft.findOneAndUpdate({ _id }, updateData, {
      new: true,
    });

    if (!aircraft) {
      return res.status(404).json({ message: "Aircraft not found" });
    }

    await res
      .status(200)
      .json({ aircraft, message: "Aircraft updated successfully" });
  } catch (err) {
    next(err);
  }
};
