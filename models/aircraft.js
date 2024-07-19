const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const aircraftSchema = new Schema({
  number: {
    type: String,
    required: true,
  },
  pin: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Aircraft", aircraftSchema);
