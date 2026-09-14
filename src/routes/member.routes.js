const express = require("express");
const router = express.Router();

// Import both controllers
const memberController = require("../controllers/member.controller");
const authController = require("../controllers/auth.controller");
const authenticate = require("../middleware/authenticate");

// Use authController.getMe for the profile retrieval
router.get("/me", authenticate, authController.getMe); 
router.patch("/me", authenticate, memberController.updateOwnProfile);
router.get("/me/events", authenticate, memberController.getMyEvents);

module.exports = router;