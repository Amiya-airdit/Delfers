const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const complaintTypeSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
      maxlength: 50,
    },
    relatedKits: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "MedicalKit",
      },
    ],
    relatedItems: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Item",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ComplaintType", complaintTypeSchema);
