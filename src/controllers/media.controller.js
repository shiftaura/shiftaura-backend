const { generateUploadSignature } = require("../services/cloudinary.service");
const { successResponse, errorResponse } = require("../utils/response");

exports.getUploadSignature = (req, res) => {
  const { type } = req.query;
  if (!["avatar", "event", "event-gallery"].includes(type)) {
    return errorResponse(res, 400, "Invalid upload type");
  }

  const signatureData = generateUploadSignature(type);
  return successResponse(res, 200, "Signature generated", signatureData);
};