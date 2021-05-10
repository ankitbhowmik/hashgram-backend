const multer = require("multer");

const upload = multer();

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, './pulic/uploads/posts/');
    },
    filename:(req, file, cb)=>{
        cb(null, new Date().toISOString().replace(/:g/, '-')+file.originalname);
    }
});

// upto 1mb image is allowed
const limits = {fileSize: 1024*1024*1};

const allowedType = ['png', 'jpg', 'jpeg'];
const fileFilter = (req, file, cb)=>{
    if(allowedType.includes(`image/${file.mimetype}`))
        cb(null, true)
    else
        cb(new Error(`only ${allowedType.join(" or ")} is allowed`), false);
}

