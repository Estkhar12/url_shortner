import mongoose from "mongoose";

const visitSchema = new mongoose.Schema({
  shortCode: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  userAgent: String,
  ipAddress: String,
  referrer: String,
  isUnique: { type: Boolean, default: false },
});

const Visit = mongoose.model("Visit", visitSchema);
export default Visit;
