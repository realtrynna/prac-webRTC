import { Service } from "typedi";

import { SignUpDao } from "../daos";
import { SignUpDto } from "../dtos";
import { 
    generateHashPassword, 
    compareHashPassword,
    generateToken
} from "../utils/index";

@Service()
export class UserService {
    constructor(private readonly userDao: SignUpDao) {}

    async signUp({ nickname, password }: SignUpDto) {
        const findUserByNickname = await this.userDao.findUserByNickname(nickname);

        if (findUserByNickname) return null;

        const hashPassword = await generateHashPassword(password);

        const input = {
            nickname,
            password: hashPassword,
        }

        const signUpUser = await this.userDao.signUp(input);

        return signUpUser;
    }

    async signIn({ nickname, password }: SignUpDto) {
        const findUserByNickname = await this.userDao.findUserByNickname(nickname);
        
        const comparePassword = await compareHashPassword(password, findUserByNickname!.password);
    
        if (findUserByNickname === null || !comparePassword) return null;

        const token = await generateToken(nickname);

        return token;
    }
}   