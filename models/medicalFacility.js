import { Schema, SchemaTypes, model } from "mongoose";

//medical facility schema
const medicalFacilitySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    type: {
      type: String,
      required: true,
      maxlength: 50,
    },
    address: {
      type: String,
      required: true,
      maxlength: 255,
    },
    phoneNumbers: {
      type: String,
      required: true,
      maxlength: 50,
    },
    image: {
      type: String,
      maxlength: 255,
    },
    distanceFromAirport: {
      type: SchemaTypes.Decimal128,
      required: true,
      min: 0,
    },
    operatingHours: {
      type: String,
      required: true,
      maxlength: 100,
    },
    languagesSupported: {
      type: String,
      required: true,
      maxlength: 100,
    },
    levelOfCare: {
      type: String,
      required: true,
      maxlength: 50,
    },
    specialisations: {
      type: String,
      required: true,
      maxlength: 255,
    },
    services: {
      type: String,
      required: true,
      maxlength: 255,
    },
    isAirportEntity: {
      type: Boolean,
      required: true,
    },
    status: {
      type: String,
      required: true,
      maxlength: 50,
    },
    associatedAirports: [
      {
        type: SchemaTypes.ObjectId,
        ref: "Airport",
      },
    ],
  },
  { timestamps: true }
);

const MedicalFacility = model("MedicalFacility", medicalFacilitySchema);
export default MedicalFacility;
