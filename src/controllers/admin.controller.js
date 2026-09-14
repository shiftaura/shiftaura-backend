const User = require("../models/User");
const Event = require("../models/Event");
const JoinRequest = require("../models/JoinRequest");
const bcrypt = require("bcryptjs");
const { successResponse, errorResponse } = require("../utils/response");

// --- MEMBERS ---
exports.getAllMembers = async (req, res, next) => {
  try {
    const members = await User.find().select("-passwordHash");
    return successResponse(res, 200, "All members retrieved", members);
  } catch (error) { next(error); }
};

exports.createMember = async (req, res, next) => {
  try {
    const { name, email, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return errorResponse(res, 409, "Email already in use");

    // MVP: Set a temporary default password. In production, trigger an email setup flow.
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash("Welcome123!", salt);

    const user = await User.create({ name, email, role, passwordHash });
    const userRes = user.toObject();
    delete userRes.passwordHash;
    
    return successResponse(res, 201, "Member created successfully", userRes);
  } catch (error) { next(error); }
};

exports.updateMember = async (req, res, next) => {
  try {
    const updates = { ...req.body };
    delete updates.passwordHash; // Don't allow password updates via this generic route
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select("-passwordHash");
    if (!user) return errorResponse(res, 404, "Member not found");
    return successResponse(res, 200, "Member updated", user);
  } catch (error) { next(error); }
};

exports.deactivateMember = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!user) return errorResponse(res, 404, "Member not found");
    return successResponse(res, 200, "Member deactivated successfully");
  } catch (error) { next(error); }
};

// --- EVENTS ---
exports.getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find().populate("participants", "name");
    return successResponse(res, 200, "All events retrieved", events);
  } catch (error) { next(error); }
};

exports.createEvent = async (req, res, next) => {
  try {
    const event = await Event.create({ ...req.body, createdBy: req.user.userId });
    return successResponse(res, 201, "Event created", event);
  } catch (error) { next(error); }
};

exports.updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return errorResponse(res, 404, "Event not found");
    return successResponse(res, 200, "Event updated", event);
  } catch (error) { next(error); }
};

exports.deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return errorResponse(res, 404, "Event not found");
    return successResponse(res, 200, "Event deleted successfully");
  } catch (error) { next(error); }
};

exports.addEventImages = async (req, res, next) => {
  try {
    const { images } = req.body;
    if (!Array.isArray(images)) return errorResponse(res, 400, "Images must be an array of URLs");

    const event = await Event.findByIdAndUpdate(req.params.id, { $push: { gallery: { $each: images } } }, { new: true });
    if (!event) return errorResponse(res, 404, "Event not found");
    return successResponse(res, 200, "Images added to gallery", event);
  } catch (error) { next(error); }
};

// --- JOIN REQUESTS ---
exports.getJoinRequests = async (req, res, next) => {
  try {
    const filter = req.query.status ? { status: req.query.status } : {};
    const requests = await JoinRequest.find(filter);
    return successResponse(res, 200, "Join requests retrieved", requests);
  } catch (error) { next(error); }
};

exports.getJoinRequestById = async (req, res, next) => {
  try {
    const request = await JoinRequest.findById(req.params.id);
    if (!request) return errorResponse(res, 404, "Request not found");
    return successResponse(res, 200, "Join request retrieved", request);
  } catch (error) { next(error); }
};

exports.updateJoinRequest = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!["ACCEPTED", "REJECTED"].includes(status)) return errorResponse(res, 400, "Invalid status");

    const request = await JoinRequest.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!request) return errorResponse(res, 404, "Request not found");
    return successResponse(res, 200, `Request marked as ${status}`, request);
  } catch (error) { next(error); }
};