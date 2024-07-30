const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const airportSchema = new Schema(
  {
    iata_code: {
      type: String,
      required: true,
      maxlength: 10,
    },
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    city: {
      type: String,
      required: true,
      maxlength: 100,
    },
    country: {
      type: String,
      required: true,
      maxlength: 100,
    },
    latitude: {
      type: mongoose.SchemaTypes.Decimal128,
      required: true,
    },
    longitude: {
      type: mongoose.SchemaTypes.Decimal128,
      required: true,
    },
    groudOperactionContact: {
      type: String,
      required: true,
      maxlength: 50,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Airport", airportSchema);
