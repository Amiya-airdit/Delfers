const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    scientificName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    instructionsForUse: {
      type: String,
      required: true,
    },
    dosage: {
      type: String,
      required: true,
    },
    expirationDate: {
      type: String,
      required: true,
    },
    manufacturer: {
      type: String,
      required: true,
    },
    isControlledsubstance: {
      type: Boolean,
      required: true,
    },
    country_id: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "Country",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);
