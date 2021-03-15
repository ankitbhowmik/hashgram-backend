const express = require("express");
const router = express.Router();
const followingController = require("./following.controller");

router.put('/add-following', followingController.addFollowing);
router.put('/remove-following', followingController.removeFollowing);

module.exports = router;