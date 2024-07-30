const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const nearestAirportSchema = new Schema(
  {
    airport: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "Airport",
    },
    distance: {
      type: mongoose.SchemaTypes.Decimal128,
      required: true,
    },
    estimatedArrivalTime: {
      type: Date,
      required: true,
    },
    suitableFacilities: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "MedicalFacility",
      },
    ],
    diversionRequest: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "DiversionRequest",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("NearestAirport", nearestAirportSchema);
