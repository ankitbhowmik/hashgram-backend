require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

//mongoose
require("./src/config/mongo");

//middleware
//handling CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.CLIENT_URL);
    res.header('Access-Control-Allow-Headers', 'Content-Type, x-requested-with');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static("public"));

const {jwtVerify} = require("./src/middleware/jwtAuth");

//routes
app.get("/", (req, res)=>{
    res.send({name: "ankit", roll:12342, language:"javascript"});
})

app.use("/user", require("./src/controller/user/user.route"));
app.use("/auth", jwtVerify, require("./src/controller/following/following.route"));
app.use("/auth", jwtVerify, require("./src/controller/follower/follower.route"));

//error page 404
app.use((req, res, next)=>{
    res.status(404).send("404 page not found");
});
//server error page
app.use((err, req, res, next)=>{
    console.log("server err", err);
    res.status(500).send("server error occured");
})

//listener
const PORT = process.env.PORT || PORT;
app.listen(PORT, ()=> {console.log("server running at port ", PORT)});
