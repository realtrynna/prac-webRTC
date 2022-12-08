import { Service } from "typedi";

import { SignUpDao } from "../daos";
import { SignUpDto } from "../dtos";

@Service()
export class UserService {
    constructor(private readonly userDao: SignUpDao) {}

    async signUp({ nickname, password }: SignUpDto) {
        
    }
}   