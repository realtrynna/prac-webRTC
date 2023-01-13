import { Service } from "typedi";

import { SignUpDao } from "../daos";
import { SigninDto, SignupDto } from "../dtos";
import {
    generateHashPassword,
    compareHashPassword,
    generateToken,
} from "../utils";

@Service()
export class UserService {
    constructor(private readonly userDao: SignUpDao) {}

    async signUp({ email, nickname, password }: SignupDto) {
        const findUserByEmail = await this.userDao.findUserByEmail(email);

        if (findUserByEmail) return null;

        const hashPassword = await generateHashPassword(password);

        const input = {
            email,
            nickname,
            password: hashPassword,
        };

        const signUpUser = await this.userDao.signup(input);

        return signUpUser;
    }

    async signIn({ email, password }: SigninDto) {
        const findUserByEmail = await this.userDao.findUserByEmail(email);

        const comparePassword = await compareHashPassword(
            password,
            findUserByEmail!.password,
        );

        if (findUserByEmail === null || !comparePassword) return null;

        const token = await generateToken(
            findUserByEmail.id,
            findUserByEmail.nickname,
        );

        return token;
    }
}
