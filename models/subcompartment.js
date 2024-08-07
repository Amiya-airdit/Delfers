import { Schema, SchemaTypes, model } from "mongoose";

//sub-compartment schema
const subcompartmentSchema = new Schema(
  {
    level: {
      type: Number,
      required: true,
    },
    image_url: {
      type: String,
      maxLength: 255,
    },
    items: [
      {
        type: SchemaTypes.ObjectId,
        ref: "SubcompartmentItem",
      },
    ],
    medicalKit: {
      type: SchemaTypes.ObjectId,
      ref: "MedicalKit",
      required: true,
    },
  },
  { timestamps: true }
);

const Subcompartment = model("Subcompartment", subcompartmentSchema);
export default Subcompartment;
