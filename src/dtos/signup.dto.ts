import { ISignUp } from "../types";

export class SignUpDto {
    nickname: string;
    password: string;

    constructor({
        nickname,
        password,
    }: ISignUp) {
        this.nickname = nickname;
        this.password = password;
    }
}