import { Service } from "typedi";
import { User } from "@prisma/client";

import Prisma from "../db/prisma";
import { SignupDto } from "../dtos";

@Service()
export class SignUpDao {
    private readonly prisma;

    constructor() {
        this.prisma = Prisma;
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: {
                email,
            },
        });
    }

    async signup({
        email,
        nickname,
        password,
    }: SignupDto): Promise<Partial<User>> {
        const signupUser = await this.prisma.user.create({
            data: {
                email,
                nickname,
                password,
            },
            select: {
                id: true,
                nickname: true,
            },
        });

        return signupUser;
    }
}
