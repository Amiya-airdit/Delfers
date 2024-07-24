const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subcompartmentSchema = new Schema(
  {
    level: {
      type: Number,
      required: true,
    },
    image_url: {
      type: String,
      maxLength: 255,
    },
    items: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "SubcompartmentItem",
      },
    ],
    medicalKit: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "MedicalKit",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subcompartment", subcompartmentSchema);
