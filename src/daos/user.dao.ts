import { Service } from "typedi";
import { User } from "@prisma/client";

import Prisma from "../db/prisma";
import { SignUpDto } from "../dtos";

@Service()
export class SignUpDao {
    private readonly prisma

    constructor() {this.prisma = Prisma}

    async findUserByNickname(nickname: string): Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: {
                nickname,
            },
        });
    }

    async signUp({ nickname, password }: SignUpDto): Promise<User> {
        const signUpUser = await this.prisma.user.create({
            data: {
                nickname,
                password,
            },
            select: {
                id: true,
                password: true,
                nickname: true,
            },
        });

        return signUpUser
    }
}