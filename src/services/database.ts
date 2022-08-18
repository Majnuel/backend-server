const mongoose = require("mongoose");
import config from "../config";
import { logger } from "./logger";

export class MongoDBClient {
  private static client: MongoDBClient;

  isValidId(id: string): boolean {
    return mongoose.isValidObjectId(id);
  }

  static async getConnection() {
    if (!MongoDBClient.client) {
      try {
        logger.info("conectando a mongo DB Atlas (remote)...");
        await mongoose.connect(config.MONGO_ATLAS_CONNECTION_STRING);
        MongoDBClient.client = new MongoDBClient();
        logger.info("CONECTADO A MONGO DB ATLAS");
      } catch (err) {
        logger.error("there has been an erorr: ", err);
        return err;
      }
    }
    return MongoDBClient.client;
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
