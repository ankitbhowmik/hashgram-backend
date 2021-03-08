const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:false,
    useNewUrlParser: true
}).then(()=>{
    console.log("mongo db connected");
}).catch(err=>{
    console.log("mongo err ", err);
});

module.exports = mongoose;