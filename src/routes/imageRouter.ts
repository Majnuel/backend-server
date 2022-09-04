import express from "express";
import { isValidObjectId } from "mongoose";
import { addImageToProduct } from "../api/products";
import { MongoDBClient } from "../services/database";
const imageRouter = express.Router();
const upload = require("../middlewares/imageUpload");

imageRouter.get("/", (req, res) => {
  res.status(200).json({ msg: "image router" });
});

// when posting from POSTMAN, make sure the key field is set to "file"
imageRouter.post("/upload", upload.single("file"), async (req, res) => {
  if (!isValidObjectId(req.body.productId)) {
    res.status(400).json({ msg: "productId not valid" });
  } else {
    if (req.file === undefined) return res.send("you must select a file.");
    const imgUrl = `http://localhost:8081/api/images/file/${req.file.filename}`;
    addImageToProduct(req.body.productId, imgUrl);
    return res.send(imgUrl);
  }
});

// media routes
imageRouter.get("/file/:filename", async (req, res) => {
  try {
    const readStream: any = await MongoDBClient.getFile(
      req.params.filename
    ).then((something: any) => something.pipe(res));
  } catch (error) {
    console.log("ERROR");
    console.log(error);
    res.send("not found");
  }
});

imageRouter.delete("/file/:filename", async (req, res) => {
  try {
    await MongoDBClient.gfs.files.deleteOne({ filename: req.params.filename });
    res.send("success");
  } catch (error) {
    console.log(error);
    res.send("An error occured.");
  }
});

export { imageRouter };
