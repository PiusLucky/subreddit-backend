import mongoose, { Schema } from "mongoose";

const AuditTrailSchema: Schema = new Schema(
  {
    action: { type: String, required: true },
    target: { type: String, required: true },
    user: {
      type: mongoose.Types.ObjectId,
      required: "userId is required",
      ref: "User",
    },
  },
  { timestamps: true }
);

const AuditTrail = mongoose.model("AuditTrail", AuditTrailSchema);

export default AuditTrail;
