import { Schema, SchemaTypes, model } from "mongoose";

//airline medicalkit schema
const airlineMedicalKitSchema = new Schema(
  {
    airline: {
      type: SchemaTypes.ObjectId,
      ref: "Airline",
      required: true,
    },
    medicalKit: {
      type: SchemaTypes.ObjectId,
      ref: "MedicalKit",
      required: true,
    },
  },
  { timestamps: true }
);

const AirlineMedicalKit = model("AirlineMedicalKit", airlineMedicalKitSchema);
export default AirlineMedicalKit;
