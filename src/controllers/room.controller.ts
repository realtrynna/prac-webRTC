import { Request, response, Response } from "express";
import { Service } from "typedi";

import { RoomService } from "../services";
import { CreateRoomDto } from "../dtos/rooms/create.room.dto";

@Service()
export class ListController {
    constructor(private readonly roomService: RoomService) {}

    roomRender = async (_: Request, res: Response) => {
        const rooms = await this.roomService.findRoomList();

        return res.render("room-list", {
            userId: res.locals?.id,
            nickname: res.locals?.nickname,
            rooms,
        });
    };

    createRoomRender = async (_: Request, res: Response) => {
        return res.render("room-create", {
            userId: res.locals?.id,
            nickname: res.locals?.nickname,
        });
    };

    createRoom = async (
        { body, app }: Request<unknown, unknown, CreateRoomDto>,
        res: Response,
    ) => {
        const { id: roomId } = await this.roomService.createRoom(body);

        const io = app.get("io");

        io.of("/room").emit("newRoom", roomId);

        return res.status(201).json({
            success: true,
            data: roomId,
            message: "Room creation success",
        });
    };

    joinRoomRender = async (
        { params: { roomId }, app }: Request<any>,
        res: Response,
    ) => {
        console.log("유저 아이디", res.locals.id);
        console.log("유저 닉네임", res.locals.nickname);

        return res.render("chat", {
            roomId,
            userId: res.locals?.id,
            nickname: res.locals?.nickname,
        });
    };

    createChat = async (
        { body: { text: chat }, params: { roomId }, app }: Request<any>,
        res: Response
    ) => {
        app.get('io').to(roomId).emit("chat", chat);
        return res.end();
    }
}
