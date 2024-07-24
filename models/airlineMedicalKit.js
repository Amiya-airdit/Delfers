const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const airlineMedicalKitSchema = new Schema(
  {
    airline: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Airline",
      required: true,
    },
    medicalKit: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "MedicalKit",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AirlineMedicalKit", airlineMedicalKitSchema);
