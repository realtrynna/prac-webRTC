import { Request, RequestHandler, response, Response } from "express";
import { Service } from "typedi";

import { RoomService } from "../services";
import { CreateRoomDto, CreateChatDto } from "../dtos/index";

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
        { app, body }: Request<unknown, unknown, CreateRoomDto, unknown>,
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
        {
            app,
            params: { roomId },
        }: Request<{ roomId: string }, unknown, unknown, unknown>,
        res: Response,
    ) => {
        const room = await this.roomService.findRoomById(+roomId);

        const result = room[0].chats;

        return res.render("chat", {
            roomId,
            userId: res.locals?.id,
            nickname: res.locals?.nickname,
            chats: result,
        });
    };

    createChat = async (
        {
            app,
            params: { roomId },
            body,
            query,
        }: Request<{ roomId: any }, unknown, CreateChatDto, unknown>,
        res: Response,
    ) => {
        const createChat = await this.roomService.createChat(
            +res.locals.id,
            +roomId,
            body,
        );

        return res.end();
    };
}
