const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "images",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const uploader = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const supportedExt = /png|jpg|jpeg|webp/;
    const fileExt = path.extname(file.originalname);
    if (supportedExt.test(fileExt)) {
      cb(null, true);
    } else {
      cb(new Error("Must be png/jpg/jpeg/webp image extension."));
    }
  },
  limits: { fileSize: 5000000 },
});

module.exports = uploader;
