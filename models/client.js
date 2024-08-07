import { Schema, model } from "mongoose";

//client schema
const clientSchema = new Schema(
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
    contactName: {
      type: String,
      required: true,
      maxlength: 100,
    },
    contactEmail: {
      type: String,
      required: true,
      maxlength: 100,
    },
    contactPhone: {
      type: String,
      required: true,
      maxlength: 50,
    },
  },
  { timestamps: true }
);

const Client = model("Client", clientSchema);
export default Client;
