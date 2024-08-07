import { Schema, SchemaTypes, model } from "mongoose";

// airline schema
const airlineSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    code: {
      type: String,
      required: true,
      maxlength: 10,
    },
    aircraftModels: [
      {
        type: SchemaTypes.ObjectId,
        ref: "Aircraft",
      },
    ],
    airlineMedicalKits: [
      {
        type: SchemaTypes.ObjectId,
        ref: "AirlineMedicalKit",
      },
    ],
  },
  { timestamps: true }
);

const Airline = model("Airline", airlineSchema);
export default Airline;
