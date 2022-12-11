import { Request, Response } from "express";
import { Service } from "typedi";

import { ITokenVerify } from "../types/index";
import { verifyToken } from "../utils/index";

@Service()
export class ChatListController {
    constructor() {}

    chatRender = async (
        { query: { token } }: Request<unknown, unknown, unknown, any>,
        res: Response,
    ) => {
        const { nickname } = await verifyToken(token) as ITokenVerify;

        return res.render("chat", {
            nickname,
            token,
        });
    }   
} 