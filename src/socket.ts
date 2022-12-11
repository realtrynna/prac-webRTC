import { Server } from "socket.io";

type TPeerRoomTitle = string;

interface IOffer {
    offer: string;
    roomTitle: string;
}

interface IAnswer {
    answer: string;
    roomTitle: string;
}

interface IIce {
    candidate: any;
    roomTitle: string;
}

interface IChat {
    message: string;
    roomTitle: string;
}

export default (server: any, app: any) => {
    const io = new Server(server, { 
        path: "/socket.io",
        // cors: {
        //     origin: "*",
        // },
    });

    app.set("io", io);

    io.on("connection", (socket: any) => {
        console.log("클라이언트 접속");

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
            const { message, roomTitle } = data;

            socket.to(roomTitle).emit("chat", message);
        });
    });
}