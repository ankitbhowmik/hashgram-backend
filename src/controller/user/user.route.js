const express = require("express");
const router = express.Router();
const userController = require("./user.controller");
const {jwtVerify} = require("../../middleware/jwtAuth");
const multerUpload = require("../../middleware/trialMulter");

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/verify-token", userController.verifyToken);
router.post("/edit-profile", userController.editProfile);
router.post("/upload-profile-image", multerUpload("newProfileImg", "./public/uploads/profile"), userController.uploadProfileImage);

//not to be used by frontend only created for backed so 
//that all table related to that id deleted automatically
router.post("/delete-user", userController.deleteUser);

// when jwtVerify middleware is applied then req.userId will contains the current user id
//router.get("/testing", jwtVerify, userController.testing)

module.exports = router;
	