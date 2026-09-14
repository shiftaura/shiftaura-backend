const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  eventType: { type: String, enum: ["HACKATHON", "CONFERENCE", "WORKSHOP", "COMPETITION", "MEETUP", "OTHER"], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: { type: String, required: true },
  mode: { type: String, enum: ["ONLINE", "OFFLINE", "HYBRID"], required: true },
  registrationLink: { type: String, default: "" },
  officialLink: { type: String, default: "" },
  coverImage: { type: String, default: "" },
  requirements: [{ type: String }],
  notes: { type: String, default: "" },
  status: { type: String, enum: ["DRAFT", "UPCOMING", "ONGOING", "PAST"], default: "DRAFT" },
  result: { type: String, default: "" },
  gallery: [{ type: String }],
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

module.exports = mongoose.model("Event", eventSchema);