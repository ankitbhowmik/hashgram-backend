const express = require("express");
const router = express.Router();
const postController = require("./post.controller");
const multerUpload = require("../../middleware/trialMulter");

router.post("/upload", multerUpload("newPost", "./public/uploads/posts"), postController.upload);
router.get("/get-user-posts/:profileId?", postController.getUserPosts);
router.get("/get-home-posts", postController.getHomePosts);
router.post("/change-like", postController.changeLike);
router.post("/add-comment", postController.addComment);

module.exports = router;
