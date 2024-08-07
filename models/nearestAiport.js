import { Schema, SchemaTypes, model } from "mongoose";

//nearest airport schema
const nearestAirportSchema = new Schema(
  {
    airport: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: "Airport",
    },
    distance: {
      type: SchemaTypes.Decimal128,
      required: true,
    },
    estimatedArrivalTime: {
      type: Date,
      required: true,
    },
    suitableFacilities: [
      {
        type: SchemaTypes.ObjectId,
        ref: "MedicalFacility",
      },
    ],
    diversionRequest: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: "DiversionRequest",
    },
  },
  { timestamps: true }
);

const NearestAirport = model("NearestAirport", nearestAirportSchema);
export default NearestAirport;
