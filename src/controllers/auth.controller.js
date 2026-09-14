const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const { successResponse, errorResponse } = require("../utils/response");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return errorResponse(res, 400, "Please provide email and password");

    const user = await User.findOne({ email });
    if (!user || !user.isActive) return errorResponse(res, 401, "Invalid credentials or inactive account");

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return errorResponse(res, 401, "Invalid credentials");

    const token = generateToken(user._id, user.role);
    
    // Convert to object and remove passwordHash
    const userResponse = user.toObject();
    delete userResponse.passwordHash;

    return successResponse(res, 200, "Login successful", { user: userResponse, token });
  } catch (error) { next(error); }
};

exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId).select("-passwordHash");
    if (!user) return errorResponse(res, 404, "User not found");
    return successResponse(res, 200, "User profile retrieved", user);
  } catch (error) { next(error); }
};

exports.logout = (req, res) => {
  return successResponse(res, 200, "Logged out successfully");
};