const jwt = require("jsonwebtoken");

module.exports.jwtVerify = (req, res, next)=>{
    const {authJwt} = req.cookies;
    console.log("jwt is ",authJwt);
    if(authJwt){
        jwt.verify(authJwt, process.env.JWT_SECRET, (err, decodedToken)=>{
            if(err){
                res.send({auth:false, msg:"not correct"});
                return;
            }
            req.userId = req.userId ? req.userId : decodedToken.id;
            next();
        })
    }else{
        res.send({auth:false, msg:"no cookie found"});
        return;
    }
}
