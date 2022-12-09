import { checkPrimeSync } from "crypto";
import http from "http";
import { Server } from "socket.io";

export default (server: any) => {
    const io = new Server(server, { path: "/socket.io"});

    io.on("connection", (socket) => {
        // 모든 이벤트 수신(미들웨어)
        socket.onAny((event) => {
        });
        // 방 입장
        socket.on("room", (title, done) => {
            const roomTitle = title;

            socket.join(roomTitle);
            
            done();

            socket.to(roomTitle).emit("roomJoin", {
                message: "사용자가 입장했습니다", 
            });
        });
        // 메세지
        socket.on("sendMessage", (data, done) => {
            const { roomTitle, message } = data;

            done("나");

            socket.to(roomTitle).emit("sendMessage", {
                message,
            });
        });
        // 퇴장
        socket.on("disconnecting", data => {
            // 퇴장 메세지
            socket.rooms.forEach(room => socket.to(room).emit("leave"));
        })
        //
        //
        //
        // 피어 입장
        socket.on("peerRoom", (data, done) => {
            const peerRoomTitle = data;

            socket.join(peerRoomTitle);

            socket.to(peerRoomTitle).emit("peerRoomJoin", {
                message: "사용자 입장",
            });
        });
        // offer 수신
        socket.on("offer", data => {
            const { offer, roomTitle } = data;

            socket.to(roomTitle).emit("offer", offer);
        });
        // answer 수신
        socket.on("answer", data => {
            const { answer, roomTitle } = data;

            socket.to(roomTitle).emit("answer", answer);
        });
        // ice 수신
        socket.on("ice", data => {
            const { candidate, roomTitle } = data;

            socket.to(roomTitle).emit("ice", candidate);
        }) 
    });
}