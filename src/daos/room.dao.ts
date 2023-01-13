import { Service } from "typedi";
import { Room } from "@prisma/client";

import Prisma from "../db/prisma";
import { CreateRoomDto } from "../dtos/rooms/create.room.dto";

@Service()
export class RoomDao {
    private readonly prisma;

    constructor() {
        this.prisma = Prisma;
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
}
