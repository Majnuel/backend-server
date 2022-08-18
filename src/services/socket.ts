import * as socketio from "socket.io";

let io: any;

export const initWsServer = (server: any) => {
  io = new socketio.Server(server);

  io.on("connection", (socket: any) => {
    console.log(
      "socket connection established:",
      "SERVER SOCKET ID:",
      socket.id,
      "CLIENT SOCKET ID:",
      socket.client.id
    );

    socket.on("initiateChat", (userEmail: string) => {});

    socket.on("newMessage", (message: string) => {
      switch (message) {
        case "stock":
          socket.emit("newReply", "entrego stock de productos");
          break;
        case "orden":
          socket.emit("newReply", "entrego estado de orden");
          break;
        case "carrito":
          console.log("entrego carrito");
          socket.emit("newReply", "entrego carrito");
          break;
        default:
          socket.emit(
            "newReply",
            "Hola! No he podido comprender tu mensaje. Por favor ingresa una de las siguientes opciones \n\n - stock: para conocer nuestro stock actual \n - orden: para concer informacion de tu ultima orden \n - carrito: para conocer el estado actual de tu carrito"
          );
          break;
      }
    });
  });

  return io;
};
