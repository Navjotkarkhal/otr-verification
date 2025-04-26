// models/OTR.js
import mongoose from "mongoose";

const otrSchema = new mongoose.Schema({
  extractedText: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  }
});

const OTR = mongoose.model("OTR", otrSchema);
export default OTR;
