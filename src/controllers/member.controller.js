const User = require("../models/User");
const Event = require("../models/Event");
const { successResponse, errorResponse } = require("../utils/response");

exports.getPublicMembers = async (req, res, next) => {
  try {
    const members = await User.find({ isActive: true })
      .select("id name role avatar bio skills github linkedin portfolio achievements");
    return successResponse(res, 200, "Active members retrieved", members);
  } catch (error) { next(error); }
};

exports.getPublicMemberById = async (req, res, next) => {
  try {
    const member = await User.findOne({ _id: req.params.id, isActive: true })
      .select("id name role avatar bio skills github linkedin portfolio achievements");
    if (!member) return errorResponse(res, 404, "Member not found");
    return successResponse(res, 200, "Member retrieved", member);
  } catch (error) { next(error); }
};

exports.updateOwnProfile = async (req, res, next) => {
  try {
    const updates = { ...req.body };
    // Strictly prevent privilege escalation and unauthorized changes
    delete updates.role;
    delete updates.isActive;
    delete updates.passwordHash;
    delete updates.email;

    const user = await User.findByIdAndUpdate(req.user.userId, updates, { new: true, runValidators: true }).select("-passwordHash");
    return successResponse(res, 200, "Profile updated successfully", user);
  } catch (error) { next(error); }
};

exports.getMyEvents = async (req, res, next) => {
  try {
    const events = await Event.find({ participants: req.user.userId, status: "UPCOMING" })
      .populate("participants", "name avatar role")
      .populate("createdBy", "name");
    return successResponse(res, 200, "Your upcoming events retrieved", events);
  } catch (error) { next(error); }
};