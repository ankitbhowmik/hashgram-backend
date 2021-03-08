require("dotenv").config();
const express = require("express");
const app = express();

//mongoose
//require("./src/config/mongo");

//middleware
app.use(express.static("public"));

//routes
app.get("/", (req, res)=>{
    res.send("git is initialised for first time");
})

//error page
app.use((req, res, next)=>{
    res.status(404).send("404 page not found");
});

app.use((err, req, res, next)=>{
    console.log("server err", err);
    res.status(500).send("server error occured");
})

//listener
const PORT = process.env.PORT || PORT;
app.listen(PORT, ()=> {console.log("server running at port ", PORT)});