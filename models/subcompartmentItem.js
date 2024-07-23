const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subcompartmentItemSchema = new Schema(
  {
    item_id: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "Item",
    },
    quantity: {
      type: String,
      required: true,
    },
    subcompartment_id: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "Subcompartment",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubcompartmentItem", subcompartmentItemSchema);
