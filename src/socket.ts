import { Server, Socket } from "socket.io";

import { RoomDao } from "./daos";
import { TPeerRoomTitle, IOffer, IAnswer, IIce, IChat } from "./types/index";
import chalk from "chalk";

interface IRequestQuery {
    roomId: string;
}

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

    // const room = io.of("/room");
    const chat = io.of("/chat");

    chat.on("connection", (socket: Socket) => {
        socket.on("join", (data) => {
            socket.join(data);
            socket.to(data).emit("join", "상대방 입장");
        });

        socket.on("chat", (data) => {
            const { roomId, content, sender } = data;

            socket.to(roomId).emit("chat", {
                content,
                sender,
            });
        });

        socket.on("disconnect", async () => {
            const { roomId }: IRequestQuery = socket.handshake
                .query as unknown as IRequestQuery;

            const currentRoom = chat.adapter.rooms.get(roomId);
            const userCount = currentRoom?.size;

            console.log(userCount);

            if (userCount === undefined) {
                console.log("삭제 완료!!!!!!!!!!!!!!!!!!!!!!!!!!");
                const deleteRoom = new RoomDao();
                await deleteRoom.removeRoom(+roomId);
            }
        });

        socket.on("offer", (data) => {
            const { offer, roomId } = data;

            socket.to(roomId).emit("offer", offer);
        });

        socket.on("answer", (data) => {
            const { answer, roomId } = data;

            socket.to(roomId).emit("answer", answer);
        });

        socket.on("ice", (data) => {
            const { candidate, roomId } = data;

            socket.to(roomId).emit("ice", candidate);
        });
    });
};
