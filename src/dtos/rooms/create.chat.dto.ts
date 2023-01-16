import { ICreateChat } from "../../types";

export class CreateChatDto {
    content: string;
    imageUrl: string | null;

    constructor({ content, imageUrl, userId, roomId }: ICreateChat) {
        this.content = content;
        this.imageUrl = imageUrl === undefined ? null : imageUrl;
    }
}
