const { errorResponse } = require("../utils/response");

const notFound = (req, res, next) => {
  return errorResponse(res, 404, `Route not found - ${req.originalUrl}`, "NOT_FOUND");
};

module.exports = notFound;