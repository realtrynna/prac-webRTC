import { Service } from "typedi";

import { RoomDao } from "../daos";
import { CreateRoomDto, CreateChatDto } from "../dtos";

@Service()
export class RoomService {
    constructor(private readonly roomDao: RoomDao) {}

    async findRoomById(roomId: number) {
        return await this.roomDao.findRoomById(roomId);
    }

    async findRoomList() {
        return await this.roomDao.findRoomList();
    }

    async createRoom({ userId, title, max, password }: CreateRoomDto) {
        return await this.roomDao.createRoom({
            userId,
            title,
            max,
        });
    }

    async createChat(
        userId: number,
        roomId: number,
        { content, imageUrl }: CreateChatDto,
    ) {
        return await this.roomDao.createChat(userId, roomId, {
            content,
            imageUrl: imageUrl === undefined ? null : imageUrl,
        });
    }
}
