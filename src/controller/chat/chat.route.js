const express = require("express");
const router = express.Router();
const chatController = require("./chat.controller");

router.post("/create", chatController.createChat);
router.get("/get-chats", chatController.getChats);
router.post("/get-messages", chatController.getMessages);
router.post("/send-message", chatController.sendMessage);

module.exports = router;