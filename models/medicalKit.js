const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const medicalKitSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    aircraftModel_id: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "Aircraft",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MedicalKit", medicalKitSchema);
