const express = require("express");
const router = express.Router();
const profileController = require("./profile.controller");
const multerUpload = require("../../middleware/trialMulter");

router.post("/edit-profile", profileController.editProfile);
router.get("/get-profile-data/:profileId?", profileController.getProfileData)
router.post("/upload-profile-image", multerUpload("newProfileImg", "./public/uploads/profile"), profileController.uploadProfileImage);

module.exports = router;