import { Schema, SchemaTypes, model } from "mongoose";

//aircraft schema
const aircraftSchema = new Schema(
  {
    model: {
      type: String,
      required: true,
      maxlength: 100,
    },
    manufacturer: {
      type: String,
      required: true,
      maxlength: 100,
    },
    airline: {
      type: SchemaTypes.ObjectId,
      ref: "Airline",
      required: true,
    },
    modelMedicalKits: [
      {
        type: SchemaTypes.ObjectId,
        ref: "ModelMedicalKit",
      },
    ],
    number: {
      type: String,
      required: true,
    },
    pin: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Aircraft = model("Aircraft", aircraftSchema);
export default Aircraft;
