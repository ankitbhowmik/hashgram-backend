const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.once("open", function () {
    console.log("connection has been made");
}).on("error", function (err) {
    console.log("error occured ", err);
})

module.exports = mongoose;