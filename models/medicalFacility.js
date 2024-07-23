const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const medicalFacilitySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    distanceFromAirport: {
      type: String,
      required: true,
    },
    operatingHours: {
      type: String,
      required: true,
    },
    languageSupported: {
      type: String,
      required: true,
    },
    levelOfCare: {
      type: String,
      required: true,
    },
    specialisations: {
      type: String,
      required: true,
    },
    services: {
      type: String,
      required: true,
    },
    isAirportEntity: {
      type: Boolean,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["active", "inActive"],
    },
    associatedAirports: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Airport",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("MedicalFacility", medicalFacilitySchema);
