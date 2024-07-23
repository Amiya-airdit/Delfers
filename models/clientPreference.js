const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientPreferenceSchema = new Schema(
  {
    client_id: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "Client",
    },
    isPreferred: {
      type: Boolean,
      required: true,
    },
    mediaclFacility_id: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "MedicalFacility",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ClientPreference", clientPreferenceSchema);
