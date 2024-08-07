import { Schema, SchemaTypes, model } from "mongoose";

//diversion request schema
const diversionRequestSchema = new Schema(
  {
    timestamp: {
      type: Date,
      required: true,
    },
    flightNumber: {
      type: String,
      required: true,
      maxLength: 10,
    },
    aircraftType: {
      type: String,
      required: true,
      maxlength: 100,
    },
    currentPositionLatitude: {
      type: SchemaTypes.Decimal128,
      required: true,
    },
    currentPositionLongitude: {
      type: SchemaTypes.Decimal128,
      required: true,
    },
    currentPositionAltitude: {
      type: SchemaTypes.Decimal128,
      required: true,
    },
    currentPositionSpeed: {
      type: SchemaTypes.Decimal128,
      required: true,
    },
    currentPositionHeading: {
      type: SchemaTypes.Decimal128,
      required: true,
    },
    complaintType: {
      type: String,
      required: true,
      maxlength: 50,
    },
    severity: {
      type: String,
      required: true,
      maxlength: 50,
    },
    patientAge: {
      type: Number,
      required: true,
    },
    specialisedTreatmentNeeded: {
      type: Boolean,
      required: true,
    },
    requiredLevelOfCare: {
      type: String,
      required: true,
      maxlength: 50,
    },
    preferredLanguages: {
      type: String,
      required: true,
      maxlength: 50,
    },
    selectedAirport: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: "Airport",
    },
    selectedFacility: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: "MedicalFacility",
    },
    status: {
      type: String,
      required: true,
      maxlength: 50,
    },
    client: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: "Client",
    },
  },
  { timestamps: true }
);

const DiversionRequest = model("DiversionRequest", diversionRequestSchema);
export default DiversionRequest;
