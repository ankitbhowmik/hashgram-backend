const multer = require("multer");

function sendDetail(fileName, location, allowed=['jpg', 'png', 'jpeg', 'image/JPG', 'PNG', 'JPEG']){
    const storage = multer.diskStorage({
        destination:(req, file, cb)=>{
            console.log("file is ", file);
            console.log("cb is ", cb);
            cb(null, location);
        },
        filename: (req, file, cb)=>{
            cb(null, new Date().toISOString().replace(/:g/, "-")+file.originalname);
        }
    });
    
    const fileFilter = (req, file, cb)=>{
        if(allowed.includes(file.mimetype.substring(6)))
            cb(null, true);
        else 
            cb(new Error(`ohh no only ${allowed.join(" or ")} is allowed`), false);
    }
    
    const limits = {fileSize: 1024*1024*3};

    const uploadFile = (req, res, next)=>{
        const upload = multer({storage, fileFilter, limits}).single(fileName);
        upload(req, res, err=>{
            if(err){
                console.log("some error occured ");
                res.send({msg: "some error occured ", err});
            }else{
                next();
            }
        });
    }
    return uploadFile;  
}




module.exports = sendDetail;

