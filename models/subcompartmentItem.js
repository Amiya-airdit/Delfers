const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subcompartmentItemSchema = new Schema(
  {
    item: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "Item",
    },
    quantity: {
      type: Number,
      required: true,
    },
    subcompartment: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "Subcompartment",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubcompartmentItem", subcompartmentItemSchema);
