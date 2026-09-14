const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["ADMIN", "MEMBER"], default: "MEMBER" },
  avatar: { type: String, default: "" },
  bio: { type: String, default: "" },
  skills: [{ type: String }],
  github: { type: String, default: "" },
  linkedin: { type: String, default: "" },
  portfolio: { type: String, default: "" },
  achievements: [{ type: String }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);