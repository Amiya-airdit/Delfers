import { Schema, model } from "mongoose";

//item schema
const itemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    scientificName: {
      type: String,
      required: true,
      maxlength: 100,
    },
    category: {
      type: String,
      required: true,
      maxlength: 50,
    },
    image_url: {
      type: String,
      required: true,
      maxLength: 255,
    },
    instructionsForUse: {
      type: String,
      required: true,
      maxLength: 255,
    },
    dosage: {
      type: String,
      required: true,
      maxlength: 50,
    },
    expirationDate: {
      type: Date,
      required: true,
    },
    manufacturer: {
      type: String,
      required: true,
      maxlength: 100,
    },
    isControlledsubstance: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Item = model("Item", itemSchema);
export default Item;
