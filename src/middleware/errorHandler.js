const { errorResponse } = require("../utils/response");

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    return errorResponse(res, 400, message, "VALIDATION_ERROR");
  }
  
  if (err.code === 11000) {
    return errorResponse(res, 409, "Duplicate field value entered", "DUPLICATE_ERROR");
  }

  return errorResponse(res, 500, "Internal Server Error", "SERVER_ERROR");
};

module.exports = errorHandler;