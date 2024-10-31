import { Server as SocketIOServer } from "socket.io";
import http from "http";
import { Socket } from "dgram";

export const initSocketServer = (server: http.Server) => {
  const io = new SocketIOServer(server);

  io.on("connection", (socket) => {
    console.log("A user connected");

    // Listen for "Notification" event from the frontend
    socket.on("notification", (data) => {
      // Broadcast the notification data to all connected clients(admin dashboard)

      io.emit("newNotification", data);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};
