const express = require("express");
const router = express.Router();
const userController = require("./user.controller");
const {jwtVerify} = require("../../middleware/jwtAuth");

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/verify-token", userController.verifyToken);

//not to be used by frontend only created for backed so 
//that all table related to that id deleted automatically
router.post("/delete-user", userController.deleteUser);

// when jwtVerify middleware is applied then req.userId will contains the current user id
//router.get("/testing", jwtVerify, userController.testing)

module.exports = router;
	