const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
      type: mongoose.SchemaTypes.Decimal128,
      required: true,
    },
    currentPositionLongitude: {
      type: mongoose.SchemaTypes.Decimal128,
      required: true,
    },
    currentPositionAltitude: {
      type: mongoose.SchemaTypes.Decimal128,
      required: true,
    },
    currentPositionSpeed: {
      type: mongoose.SchemaTypes.Decimal128,
      required: true,
    },
    currentPositionHeading: {
      type: mongoose.SchemaTypes.Decimal128,
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
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "Airport",
    },
    selectedFacility: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "MedicalFacility",
    },
    status: {
      type: String,
      required: true,
      maxlength: 50,
    },
    client: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "Client",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DiversionRequest", diversionRequestSchema);
