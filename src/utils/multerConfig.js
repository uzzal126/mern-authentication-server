const multer = require("multer");
const path = require("path"); 

// Multer config
const storage = multer.diskStorage({});
const fileFilter = async (req, file, cb) => {
    try {
        let ext = path.extname(file.originalname);
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
            throw new Error("File type is not supported");
        }
        cb(null, true);
    } catch (err) {
        cb(err, false);
    }
};

const multerConfig = multer({ storage, fileFilter });

module.exports = multerConfig;
