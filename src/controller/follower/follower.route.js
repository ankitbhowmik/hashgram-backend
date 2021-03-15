const express = require("express");
const router = express.Router()
const followingController = require("./follower.controller");

router.put('/add-follower', followingController.addFollower);
router.put('/remove-follower', followingController.removeFollower);

module.exports = router;