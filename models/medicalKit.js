import { Schema, SchemaTypes, model } from "mongoose";

//medicalkit schema
const medicalKitSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      maxLength: 50,
    },
    description: {
      type: String,
      required: true,
      maxLength: 255,
    },
    image_url: {
      type: String,
      maxlength: 255,
    },
    location: {
      type: String,
      required: true,
      maxlength: 100,
    },
    items: [
      {
        type: SchemaTypes.ObjectId,
        ref: "Subcompartment",
      },
    ],
  },
  { timestamps: true }
);

const MedicalKit = model("MedicalKit", medicalKitSchema);
export default MedicalKit;
