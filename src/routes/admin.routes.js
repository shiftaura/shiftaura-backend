const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

router.use(authenticate, authorize("ADMIN"));

router.get("/members", adminController.getAllMembers);
router.post("/members", adminController.createMember);
router.patch("/members/:id", adminController.updateMember);
router.delete("/members/:id", adminController.deactivateMember);

router.get("/events", adminController.getAllEvents);
router.post("/events", adminController.createEvent);
router.patch("/events/:id", adminController.updateEvent);
router.delete("/events/:id", adminController.deleteEvent);
router.post("/events/:id/images", adminController.addEventImages);

router.get("/join-requests", adminController.getJoinRequests);
router.get("/join-requests/:id", adminController.getJoinRequestById);
router.patch("/join-requests/:id", adminController.updateJoinRequest);

module.exports = router;