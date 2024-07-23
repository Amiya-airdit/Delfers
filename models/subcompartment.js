const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subcompartmentSchema = new Schema(
  {
    level: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    medicalKit_id: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "Medicalkit",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subcompartment", subcompartmentSchema);
