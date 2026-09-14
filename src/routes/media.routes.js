const express = require("express");
const router = express.Router();
const mediaController = require("../controllers/media.controller");
const authenticate = require("../middleware/authenticate");

router.get("/upload-signature", authenticate, mediaController.getUploadSignature);

module.exports = router;