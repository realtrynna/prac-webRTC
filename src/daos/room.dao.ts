import { Service } from "typedi";
import { Room } from "@prisma/client";

import Prisma from "../db/prisma";
import { CreateRoomDto, CreateChatDto } from "../dtos";
import { runInThisContext } from "vm";

@Service()
export class RoomDao {
    private readonly prisma;

    constructor() {
        this.prisma = Prisma;
    }

    async findRoomById(id: number) {
        return this.prisma.room.findMany({
            where: {
                id,
            },
            include: {
                chats: {
                    include: {
                        user: true,
                    },
                    skip: 0,
                    take: 20,
                    orderBy: {
                        createdAt: "desc",
                    },
                },
            },
        });
    }

    async findRoomByTitle(title: string) {
        return this.prisma.room.findMany({
            where: {
                title,
            },
        });
    }

    async findRoomList() {
        return this.prisma.room.findMany({});
    }

    async createRoom({ userId, title, max, password }: CreateRoomDto) {
        return this.prisma.room.create({
            data: {
                title,
                max,
                userId,
            },
        });
    }

    async createChat(
        userId: number,
        roomId: number,
        { content, imageUrl }: CreateChatDto,
    ) {
        return this.prisma.chat.create({
            data: {
                content,
                imageUrl,
                userId,
                roomId,
            },
        });
    }

    async removeRoom(roomId: number) {
        console.log("다오로 넘어온 룸 아이디는?", roomId);
        return this.prisma.room.delete({
            where: {
                id: roomId,
            },
        });
    }
}
