const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const nearestAirportSchema = new Schema(
  {
    airport_id: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "Airport",
    },
    distance: {
      type: String,
      required: true,
    },
    estimatedArrivalTime: {
      type: String,
      required: true,
    },
    suitableFacilities: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "MedicalFacility",
      },
    ],
    diversionRequest_id: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "DiversionRequest",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("NearestAirport", nearestAirportSchema);
