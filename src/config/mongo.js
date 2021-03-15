const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:false,
    useNewUrlParser: true
})

mongoose.connection.once("open", function(){
    console.log("connection has been made");
}).on("error", function(err){
    console.log("error occured ", err);
})

module.exports = mongoose;