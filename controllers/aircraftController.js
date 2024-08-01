const mongoose = require("mongoose");

const Aircraft = require("../models/aircraft");

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
    if (model) updateData.model = model;
    if (manufacturer) updateData.manufacturer = manufacturer;
    if (airline) updateData.airline = airline;
    if (number) updateData.number = number;

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
