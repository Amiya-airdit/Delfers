const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const aircraftSchema = new Schema(
  {
    model: {
      type: String,
      required: true,
      maxlength: 100,
    },
    manufacturer: {
      type: String,
      required: true,
      maxlength: 100,
    },
    airline: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Airline",
      required: true,
    },
    modelMedicalKits: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "MedicalKit",
      },
    ],
    number: {
      type: String,
      required: true,
    },
    pin: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Aircraft", aircraftSchema);
