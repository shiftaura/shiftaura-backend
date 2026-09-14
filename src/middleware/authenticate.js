const jwt = require("jsonwebtoken");
const { errorResponse } = require("../utils/response");

const authenticate = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return errorResponse(res, 401, "Not authorized to access this route", "UNAUTHORIZED");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };
    next();
  } catch (error) {
    return errorResponse(res, 401, "Token is invalid or expired", "INVALID_TOKEN");
  }
};

module.exports = authenticate;