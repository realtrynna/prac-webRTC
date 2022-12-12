import { Request, Response } from "express";
import { Service } from "typedi";

import { verifyToken } from "../utils/token";
import { IToken, ITokenVerify } from "../types";

@Service()
export class MediaController {
    constructor() {}

    mediaRender = async (
        req: Request<unknown, unknown, unknown, IToken>,
        res: Response,
    ) => {
        const { token } = req.query;
        
        const { nickname } = await verifyToken(token) as ITokenVerify;

        return res.render("media", {
            nickname,
        });
    }
}