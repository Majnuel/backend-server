import { ApiError, ErrorStatus } from "../api/error";
import config from "../config";

const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

const storage = new GridFsStorage({
  url: config.MONGO_ATLAS_CONNECTION_STRING,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req: any, file: any) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      throw new ApiError(
        "Only png and jpeg files allowed",
        ErrorStatus.BadRequest
      );
    }
    return {
      bucketName: "photos",
      filename: `${Date.now()}-products-${file.originalname}`
    };
  }
});

module.exports = multer({ storage });
