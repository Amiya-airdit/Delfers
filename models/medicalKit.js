const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Subcompartment",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("MedicalKit", medicalKitSchema);
