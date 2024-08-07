import { Schema, SchemaTypes, model } from "mongoose";

//complaint type schema
const complaintTypeSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
      maxlength: 50,
    },
    relatedKits: [
      {
        type: SchemaTypes.ObjectId,
        ref: "MedicalKit",
      },
    ],
    relatedItems: [
      {
        type: SchemaTypes.ObjectId,
        ref: "Item",
      },
    ],
  },
  { timestamps: true }
);

const ComplaintType = model("ComplaintType", complaintTypeSchema);
export default ComplaintType;
