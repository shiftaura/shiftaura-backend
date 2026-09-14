const express = require("express");
const router = express.Router();
const memberController = require("../controllers/member.controller");
const eventController = require("../controllers/event.controller");
const joinRequestController = require("../controllers/joinRequest.controller");

router.get("/members", memberController.getPublicMembers);
router.get("/members/:id", memberController.getPublicMemberById);
router.get("/events/past", eventController.getPublicPastEvents);
router.post("/join-requests", joinRequestController.submitJoinRequest);

module.exports = router;