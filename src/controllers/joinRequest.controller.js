const JoinRequest = require("../models/JoinRequest");
const { successResponse, errorResponse } = require("../utils/response");

exports.submitJoinRequest = async (req, res, next) => {
  try {
    await JoinRequest.create(req.body);
    return successResponse(res, 201, "Your team membership request has been submitted.");
  } catch (error) { next(error); }
};