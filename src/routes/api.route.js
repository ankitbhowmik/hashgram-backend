const express = require("express");
const apiRouter = express.Router();

apiRouter.use("/profile", require("../controller/profile/profile.route"));
apiRouter.use("/post", require("../controller/post/post.route"));
apiRouter.use("/chat", require("../controller/chat/chat.route"));

module.exports = apiRouter;