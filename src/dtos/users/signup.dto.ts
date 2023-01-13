import { ISignup } from "../../types";

export class SignupDto {
    email: string;
    nickname: string;
    password: string;

    constructor({ email, nickname, password }: ISignup) {
        this.email = email;
        this.nickname = nickname;
        this.password = password;
    }
}
