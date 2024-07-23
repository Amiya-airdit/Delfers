const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const complaintTypeSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    related_kits: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "MedicalKit",
      },
    ],
    related_items: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "Item",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ComplaintType", complaintTypeSchema);
