import http from "http";
import { Server } from "socket.io";

export default (server: any, app: any) => {
    const io = new Server(server, { path: "/socket.io"});

    app.set("io", io);

    const room = io.of("/room");

    room.on("connection", (socket: any) => {
        console.log("클라이언트 입장");

        socket.emit("joinRoom", "본체에서 보냄니당");
    });
}