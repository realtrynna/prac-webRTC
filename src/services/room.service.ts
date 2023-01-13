import { Service } from "typedi";

import { RoomDao } from "../daos";
import { CreateRoomDto } from "../dtos/rooms/create.room.dto";

@Service()
export class RoomService {
    constructor(private readonly roomDao: RoomDao) {}

    async findRoomList() {
        return this.roomDao.findRoomList();
    }

    async createRoom({ userId, title, max, password }: CreateRoomDto) {
        return await this.roomDao.createRoom({
            userId,
            title,
            max,
        });
    }
}
