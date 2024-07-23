const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSpecificInfoSchema = new Schema(
  {
    client_id: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "Client",
    },
    isDestination: {
      type: Boolean,
      required: true,
    },
    isDiversionAirport: {
      type: Boolean,
      required: true,
    },
    frequencyOfUse: {
      type: String,
      required: true,
      enum: ["veryLow", "low", "moderate", "high", "veryHigh"],
    },
    airport_id: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "Airport",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ClientSpecificInfo", clientSpecificInfoSchema);
