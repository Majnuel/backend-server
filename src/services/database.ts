import mongoose from "mongoose";
import config from "../config";
import { logger } from "./logger";
import Grid from "gridfs-stream";

export class MongoDBClient {
  private static client: MongoDBClient;
  static gfs: Grid.Grid;
  private static gridfsBucket: any;

  isValidId(id: string): boolean {
    return mongoose.isValidObjectId(id);
  }

  static async getConnection() {
    if (!MongoDBClient.client) {
      try {
        logger.info("conectando a mongo DB Atlas (remote)...");
        await mongoose.connect(config.MONGO_ATLAS_CONNECTION_STRING);
        MongoDBClient.client = new MongoDBClient();

        MongoDBClient.gridfsBucket = new mongoose.mongo.GridFSBucket(
          mongoose.connection.db,
          { bucketName: "photos" }
        );

        MongoDBClient.gfs = Grid(mongoose.connection, mongoose.mongo);
        MongoDBClient.gfs.collection("photos");

        logger.info("CONECTADO A MONGO DB ATLAS");
      } catch (err) {
        logger.error("there has been an erorr: ", err);
        return err;
      }
    }
    return MongoDBClient.client;
  }

  static async getFile(filename: string) {
    try {
      const doc = MongoDBClient.gridfsBucket.find({ filename: filename });
      const numberDocs = await doc.count();

      if (numberDocs !== 1) throw new Error("file not found");

      const file =
        MongoDBClient.gridfsBucket.openDownloadStreamByName(filename);
      return file;
    } catch (err) {
      logger.error("Error finding File");
      logger.error(err);
      throw err;
    }
  }
}

export const disconnectMongoDB = async () => {
  try {
    logger.info("desconectando a mongo DB Atlas");
    await mongoose.disconnect();
    logger.info("desconectado de mongoDB atlas");
  } catch (err) {
    logger.error("there has been an error: ", err);
    return err;
  }
};
