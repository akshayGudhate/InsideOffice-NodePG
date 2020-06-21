const multer = require("multer");   // multer package for image & files uploading

/** file filtering steps */
const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "*/*" || file.mimetype === "image/png" || file.mimetype === "image/bmp" || file.mimetype === "image/jpg" ||
        file.mimetype === "image/svg" || file.mimetype === "image/jpeg" || file.mimetype === "text/x-vcard" ||
        file.mimetype === "image/svg+xml" || file.mimetype === "application/apk" || file.mimetype === "application/pdf" ||
        file.mimetype === "application/vcf" || file.mimetype === "application/vnd.android.package-archive" ||
        file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
        cb(new Error("File format does not support"));
    }
};

/** disk storage steps */
const storage = multer.diskStorage({
    destination: async (req, file, cb) => {

        if (file.mimetype.includes('image/')) {
            cb(null, "./src/uploads/images");
        } else {
            cb(null, "./src/uploads/docs");
        }

    },
    filename: async (req, file, cb) => {
        cb(null, new Date().toISOString() + "_" + file.originalname);
    }
});

/** passing multer file and destination to save */
const multerUpload = multer({ storage, fileFilter });




module.exports = multerUpload;