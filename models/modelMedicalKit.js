import { Schema, SchemaTypes, model } from "mongoose";

//model medicalkit schema
const modelMedicalKitSchema = new Schema(
  {
    aircraftModel: {
      type: SchemaTypes.ObjectId,
      ref: "Aircraft",
      required: true,
    },
    medicalKit: {
      type: SchemaTypes.ObjectId,
      ref: "MedicalKit",
      required: true,
    },
  },
  { timestamps: true }
);

const ModelMedicalKit = model("ModelMedicalKit", modelMedicalKitSchema);
export default ModelMedicalKit;
