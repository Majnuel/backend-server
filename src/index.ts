import { myServer } from "./services/server";
import { MongoDBClient } from "./services/database";
import config from "./config";
import { logger } from "./services/logger";
import { initWsServer } from "./services/socket";

const server = myServer.listen(config.PORT, async () => {
  // await initMongoDB();
  MongoDBClient.getConnection();
  // console.log(MongoDBClient.getConnection());
  initWsServer(myServer);
  logger.info(
    `SERVER UP AND RUNNING ON PORT ${config.PORT} - PID WORKER ${process.pid}`
  );
});

server.on("error", (err) => {
  logger.error("ERROR: ", err);
});
