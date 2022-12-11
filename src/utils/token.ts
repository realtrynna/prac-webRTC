import { sign, verify, SignOptions } from "jsonwebtoken";

import { privateKey, publicKey } from "../config/index";
import { ITokenPayload } from "../types/index";

export async function generateToken(nickname: string) {
    const payload: ITokenPayload = {
        nickname,
    };

    const options: SignOptions = {
        issuer: "realtrynna",
        expiresIn: "1h",
        algorithm: "RS256",
    };

    return await sign(
        payload,
        privateKey,
        options,
    );
}

export async function verifyToken(token: string) {
    return await verify(token, publicKey);
}