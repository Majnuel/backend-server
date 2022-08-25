import express from "express";
import config from "../config";
import { MongoDBClient } from "../services/database";
const imageRouter = express.Router();
const upload = require("../middlewares/imageUpload");
const Grid = require("gridfs-stream");
const mongoose = require("mongoose");

let gfs: any;
const conn = mongoose.connect(config.MONGO_ATLAS_CONNECTION_STRING);
mongoose.connection.once("open", function () {
  gfs = Grid(MongoDBClient.getConnection(), mongoose.mongo);
  console.log(gfs.__proto__);

  gfs.collection("photos");
});

imageRouter.get("/", (req, res) => {
  res.status(200).json({ msg: "image router" });
});

// when posting from POSTMAN, make sure the key field is set to "file"
imageRouter.post("/upload", upload.single("file"), async (req, res) => {
  if (req.file === undefined) return res.send("you must select a file.");
  const imgUrl = `http://localhost:8081/file/${req.file.filename}`;
  return res.send(imgUrl);
});

// media routes
imageRouter.get("/file/:filename", async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
  } catch (error) {
    res.send("not found");
  }
});

export { imageRouter };
