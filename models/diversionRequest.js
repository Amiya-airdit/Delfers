const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const diversionRequestSchema = new Schema(
  {
    timestamp: {
      type: String,
      required: true,
    },
    flightNumber: {
      type: String,
      required: true,
    },
    aircraftType: {
      type: String,
      required: true,
    },
    currentPositionLatitude: {
      type: String,
      required: true,
    },
    currentPositionLongitude: {
      type: String,
      required: true,
    },
    currentPositionAltitude: {
      type: String,
      required: true,
    },
    currentPositionSpeed: {
      type: String,
      required: true,
    },
    currentPositionHeading: {
      type: String,
      required: true,
    },
    complaintType: {
      type: String,
      required: true,
    },
    severity: {
      type: String,
      required: true,
      enum: ["veryLow", "low", "moderate", "high", "veryHigh"],
    },
    patientAge: {
      type: String,
      required: true,
    },
    patientGender: {
      type: String,
      required: true,
      enum: ["male", "female", "other"],
    },
    specialisedTreatmentNeeded: {
      type: String,
      required: true,
      enum: ["yes", "no"],
    },
    requiredLevelOfCare: {
      type: String,
      required: true,
      enum: ["veryLow", "low", "moderate", "high", "veryHigh"],
    },
    preferredLanguages: {
      type: String,
      required: true,
    },
    selectedAirport_id: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "Airport",
    },
    selectedFacility_id: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "MedicalFacility",
    },
    status: {
      type: String,
      required: true,
      enum: ["active", "inActive"],
    },
    client_id: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "Client",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DiversionRequest", diversionRequestSchema);
