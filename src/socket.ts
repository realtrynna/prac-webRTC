import { DefaultEventsMap } from "@socket.io/component-emitter";
import { Server } from "socket.io";

import { verifyToken } from "./utils";
import { 
    TPeerRoomTitle,
    IOffer,
    IAnswer,
    IIce,
    IChat,
} from "./types/index";

export default (server: any, app: any) => {
    const io = new Server(server, { 
        transports: ["websocket"],
        allowEIO3: true,
        path: "/socket.io",
        // 추후 활용(CSR)
        // cors: {
        //     origin: "*",
        //     methods: ["GET", "POST"],
        // },
    });

    app.set("io", io);

    io.on("connection", async socket => {
        // @TODO 추후 활용
        const userId = socket.handshake.headers.cookie as string;
        const nikc = await verifyToken(userId);

        socket.on("peerRoom", (data: TPeerRoomTitle) => {
            const peerRoomTitle = data;
            
            socket.join(peerRoomTitle);
            
            socket.to(peerRoomTitle).emit("peerRoomJoin", "방 입장");
        });

        socket.on("offer", (data: IOffer) => {
            const { offer, roomTitle } = data;

            socket.to(roomTitle).emit("offer", offer);
        });

        socket.on("answer", (data: IAnswer) => {
            const { answer, roomTitle } = data;

            socket.to(roomTitle).emit("answer", answer);
        });

        socket.on("ice", (data: IIce) => {
            const { candidate, roomTitle } = data;

            socket.to(roomTitle).emit("ice", candidate);
        });

        socket.on("chat", (data: IChat) => {
            const { message, roomTitle, nickname } = data;

            socket.to(roomTitle).emit("chat", { message, nickname});
        });
    });
}