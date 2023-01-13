import { JwtPayload } from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils";
import { ITokenVerify } from "../types";

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { token } = req?.cookies;

        const { userId, nickname } = (await verifyToken(token)) as ITokenVerify;

        if (token === undefined || nickname === undefined) {
            throw new Error("Token error occurred");
        }

        res.locals.nickname = nickname;
        res.locals.id = userId;

        return next();
    } catch (err) {
        console.error(err);
    }
};
