import { Schema, SchemaTypes, model } from "mongoose";

//sub-compartment item schema
const subcompartmentItemSchema = new Schema(
  {
    item: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: "Item",
    },
    quantity: {
      type: Number,
      required: true,
    },
    subcompartment: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: "Subcompartment",
    },
  },
  { timestamps: true }
);

const SubcompartmentItem = model(
  "SubcompartmentItem",
  subcompartmentItemSchema
);
export default SubcompartmentItem;
