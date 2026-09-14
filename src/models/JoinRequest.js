const mongoose = require("mongoose");

const joinRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  college: { type: String, required: true },
  year: { type: String, required: true },
  skills: [{ type: String }],
  github: { type: String, default: "" },
  linkedin: { type: String, default: "" },
  portfolio: { type: String, default: "" },
  reason: { type: String, required: true },
  status: { type: String, enum: ["PENDING", "ACCEPTED", "REJECTED"], default: "PENDING" }
}, { timestamps: true });

module.exports = mongoose.model("JoinRequest", joinRequestSchema);