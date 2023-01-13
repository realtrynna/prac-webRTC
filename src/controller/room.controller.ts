import { Request, Response } from "express";
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
        { body }: Request<unknown, unknown, CreateRoomDto>,
        res: Response,
    ) => {
        const { id: roomId } = await this.roomService.createRoom(body);

        return res.status(201).json({
            success: true,
            data: roomId,
            message: "Room creation success",
        });
    };

    joinRoomRender = async (
        { params: { roomId: roomId } }: Request<any>,
        res: Response,
    ) => {
        return res.render("chat", {
            roomId,
            userId: res.locals?.id,
            nickname: res.locals?.nickname,
        });
    };
}
