import { Schema, SchemaTypes, model } from "mongoose";

//emergency request schema
const emergencyRequestSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: Date,
      required: true,
    },
    seatNumber: {
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
    age: {
      type: Number,
      required: false,
    },
    gender: {
      type: String,
      required: false,
      enum: ["Male", "Female", "Others"],
    },
    vitalsTemp: {
      type: SchemaTypes.Decimal128,
      required: false,
    },
    vitalsHeartRate: {
      type: Number,
      required: false,
    },
    vitalsBP: {
      type: String,
      required: false,
      maxlength: 10,
    },
    scenarioImageURLs: [
      {
        type: String,
        maxlength: 255,
      },
    ],
    medicalHistory: {
      type: String,
      required: false,
      maxlength: 255,
    },
    allergies: {
      type: String,
      required: false,
      maxlength: 255,
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
  },
  { timestamps: true }
);

const EmergencyRequest = model("EmergencyRequest", emergencyRequestSchema);
export default EmergencyRequest;
