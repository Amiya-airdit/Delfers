const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const modelMedicalKitSchema = new Schema(
  {
    aircraftModel: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Aircraft",
      required: true,
    },
    medicalKit: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "MedicalKit",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ModelMedicalKit", modelMedicalKitSchema);
