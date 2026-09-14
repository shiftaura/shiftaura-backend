const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event.controller");
const authenticate = require("../middleware/authenticate");

router.get("/upcoming", authenticate, eventController.getUpcomingEvents);
router.get("/upcoming/:id", authenticate, eventController.getUpcomingEventById);

module.exports = router;