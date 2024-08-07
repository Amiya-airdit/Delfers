import { Schema, SchemaTypes, model } from "mongoose";

//airport schema
const airportSchema = new Schema(
  {
    iata_code: {
      type: String,
      required: true,
      maxlength: 10,
    },
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    city: {
      type: String,
      required: true,
      maxlength: 100,
    },
    country: {
      type: String,
      required: true,
      maxlength: 100,
    },
    latitude: {
      type: SchemaTypes.Decimal128,
      required: true,
    },
    longitude: {
      type: SchemaTypes.Decimal128,
      required: true,
    },
    groudOperactionContact: {
      type: String,
      required: true,
      maxlength: 50,
    },
  },
  { timestamps: true }
);

const Airport = model("Airport", airportSchema);
export default Airport;
