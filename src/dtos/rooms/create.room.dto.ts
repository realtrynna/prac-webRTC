import { ICreateRoom } from "../../types";

export class CreateRoomDto {
    title: string;
    password?: string;
    max: number;
    userId: number;

    constructor({ title, password, max, userId }: ICreateRoom) {
        this.title = title;
        this.password = password;
        this.max = max;
        this.userId = userId;
    }
}
