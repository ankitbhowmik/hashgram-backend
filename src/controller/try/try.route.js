const express = require("express");
const router = express.Router();
const sendFile = require("../../middleware/trialMulter");

router.post("/upload", sendFile('filename', './public/uploads/posts') ,(req, res)=>{
    console.log("req.files is ",req.files);
    res.send("reached");
})

module.exports = router;