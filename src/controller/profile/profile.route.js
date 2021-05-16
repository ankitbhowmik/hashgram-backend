const express = require("express");
const router = express.Router();
const profileController = require("./profile.controller")

router.post("/edit-profile", profileController.editProfile);

module.exports = router;