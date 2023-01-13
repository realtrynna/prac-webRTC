import { DefaultEventsMap } from "@socket.io/component-emitter";
import { Server, Socket } from "socket.io";

import { verifyToken } from "./utils";
import { TPeerRoomTitle, IOffer, IAnswer, IIce, IChat } from "./types/index";
import chalk from "chalk";

export default (server: any, app: any) => {
    const io = new Server(server, {
        transports: ["websocket"],
        allowEIO3: true,
        path: "/socket.io",
        /**
         * @ClientSideRendering
         */
        // cors: {
        //     origin: "*",
        //     methods: ["GET", "POST"],
        // },
    });

    app.set("io", io);

    const room = io.of("/room");
    const chat = io.of("/chat");

    room.on("connection", (socket) => {
        console.log("룸 접속!!!!!!!!!!!!!");
    });

    chat.on("connection", (socket) => {
        console.log("채팅 접속!!!!!!!!!!!");
    });
};
