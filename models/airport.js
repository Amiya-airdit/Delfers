const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const airportSchema = new Schema(
  {
    iataCode: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    coordinates: {
      type: String,
      required: true,
    },
    latitude: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    },
    groudOperactionContact: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Airport", airportSchema);
