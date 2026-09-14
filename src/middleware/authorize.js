const { errorResponse } = require("../utils/response");

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return errorResponse(res, 403, "User role is not authorized", "FORBIDDEN");
    }
    next();
  };
};

module.exports = authorize;