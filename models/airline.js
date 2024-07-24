const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Airline Schema
const airlineSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    code: {
      type: String,
      required: true,
      maxlength: 10,
    },
    aircraftModels: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Aircraft",
      },
    ],
    airlineMedicalKits: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "AirlineMedicalKit",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Airline", airlineSchema);
