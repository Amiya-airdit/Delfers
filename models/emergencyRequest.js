const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const emergencyRequestSchema = new Schema(
  {
    seatNo: {
      type: String,
      required: true,
      maxlength: 10,
    },
    patientType: {
      type: String,
      required: true,
      maxlength: 20,
    },
    category: {
      type: String,
      required: true,
      maxlength: 50,
    },
    vitalsTemp: {
      type: mongoose.SchemaTypes.Decimal128,
      required: true,
    },
    vitalsHeartRate: {
      type: Number,
      required: true,
    },
    vitalsBP: {
      type: String,
      required: true,
      maxlength: 10,
    },
    departureAirport: {
      type: String,
      required: true,
    },
    arrivalAirport: {
      type: String,
      required: true,
    },
    timeOfDeparture: {
      type: Date,
      required: true,
    },
    timeOfArrival: {
      type: Date,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: Date,
      required: true,
    },
    flightNumber: {
      type: String,
      required: true,
      maxlength: 10,
    },
    aircraftModel: {
      type: String,
      required: true,
    },
    airlineName: {
      type: String,
      required: true,
    },
    timeOfSubmission: {
      type: Date,
      required: true,
    },
    scenarioImageURL: {
      type: String,
      maxlength: 255,
    },
    medicalHistory: {
      type: String,
      maxlength: 255,
    },
    allergies: {
      type: String,
      maxlength: 255,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EmergencyRequest", emergencyRequestSchema);
