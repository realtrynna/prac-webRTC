import { ISignin } from "../../types";

export class SigninDto {
    email: string;
    password: string;

    constructor({ email, password }: ISignin) {
        this.email = email;
        this.password = password;
    }
}
