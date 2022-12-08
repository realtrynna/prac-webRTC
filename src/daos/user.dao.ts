import { Service } from "typedi";

import Prisma from "../db/prisma";
import { SignUpDto } from "../dtos";

@Service()
export class SignUpDao {
    private readonly prisma

    constructor() {this.prisma = Prisma}

    async signUp({ nickname, password }: SignUpDto) {
        // const findUser = await this.prisma.user()
    }
}