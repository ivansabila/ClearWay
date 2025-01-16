const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/pdf");
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const filename = Date.now() + ext;
        cb(null, filename);
    },
});

const fileFilter = (req, file, cb) => {
    const fileExt = path.extname(file.originalname).toLowerCase();
    if (fileExt === ".pdf") {
        cb(null, true);
    } else {
        req.notPdf = "File yang anda masukkan tidak memenuhi format yang ditentukan";
        cb(null, true);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;
