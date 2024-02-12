const multer = require("multer");
const path = require("path");

const checkFile = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req,file,cb)=>{
            let ext = path.extname(file.originalname);
            if (ext !== ".jpg" && ext !==".png" && ext !==".jpeg" && ext !==".gif" && ext !==".svg") {
                cb(new Error("unsupported file extension") , false)
            }
            cb(null,true)
    }

})

module.exports = checkFile