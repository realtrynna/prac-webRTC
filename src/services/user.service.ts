import { Service } from "typedi";

import { SignUpDao } from "../daos";
import { SignUpDto } from "../dtos";

@Service()
export class UserService {
    constructor(private readonly userDao: SignUpDao) {}

    async signUp({ nickname, password }: SignUpDto) {
        const findUserByNickname = await this.userDao.findUserByNickname(nickname);

        if (findUserByNickname) return "유저 존재";

        const input = {
            nickname,
            password,
        }

        const signUpUser = await this.userDao.signUp(input);

        return signUpUser;
    }
}   