import fs from "fs";
import multer from "multer";

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/";

    // Create the folder if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

const fileUploadMiddleware = multer({
  storage: storageConfig,
});

export default fileUploadMiddleware;
