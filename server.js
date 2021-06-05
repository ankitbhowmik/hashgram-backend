require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

//mongoose
require("./src/config/mongo");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

// CORS HANDLER
// prevent CORS problems
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', process.env.CLIENT_URL);
    res.header('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    next();
})
//CORS HANDLING ENDS

const { jwtVerify } = require("./src/middleware/jwtAuth");

//routes
app.get("/", (req, res) => {
    res.send({ name: "ankit", roll: 12342, language: "javascript" });
})

//do not add jwtVerify in /user it will unable to go to login page if token are not present
app.use("/user", require("./src/controller/user/user.route"));
app.use("/profile", jwtVerify, require("./src/controller/profile/profile.route"));
app.use("/post", jwtVerify, require("./src/controller/post/post.route"));

app.use("/auth", jwtVerify, require("./src/controller/following/following.route"));
app.use("/auth", jwtVerify, require("./src/controller/follower/follower.route"));

//testing route will be delected when released
app.use("/", require("./src/controller/try/try.route"));

//error page 404
app.use((req, res, next) => {
    res.status(404).send("404 page not found");
});
//server error page
app.use((err, req, res, next) => {
    console.log("server err", err);
    res.status(500).send("server error occured");
})

//listener
const PORT = process.env.PORT || PORT;
app.listen(PORT, () => { console.log("server running at port ", PORT) });
