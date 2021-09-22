require("dotenv").config();
const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, { cors: { origin: [process.env.CLIENT_URL] } });
const cookieParser = require("cookie-parser");
const cors = require("cors");

const { jwtVerify } = require("./src/middleware/jwtAuth");
const rootSocket = require("./src/config/rootSocket");

//mongoose
require("./src/config/mongo");

//middleware
app.set('trust proxy', 1)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));

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


//do not add jwtVerify in /user it will unable to go to login page if token are not present
app.use("/user", require("./src/controller/user/user.route"));
app.use("/api", jwtVerify, require("./src/routes/api.route"));

//socket
rootSocket(io);

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
httpServer.listen(PORT, () => { console.log("server running at port ", PORT) });
