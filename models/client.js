const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    type: {
      type: String,
      required: true,
      maxlength: 50,
    },
    contactName: {
      type: String,
      required: true,
      maxlength: 100,
    },
    contactEmail: {
      type: String,
      required: true,
      maxlength: 100,
    },
    contactPhone: {
      type: String,
      required: true,
      maxlength: 50,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Client", clientSchema);
