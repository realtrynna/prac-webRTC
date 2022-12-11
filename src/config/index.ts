import fs from "fs";
import path from "path";

import { IPrivateKey, TPublicKey } from "../types";

export const port: string = process.env.PORT || "2000";
export const passphrase: string = process.env.PASSPHRASE || "941103";
export const hashSaltRound: string = process.env.HASHSALTROUND || "12";

export const privateKey: IPrivateKey = {
    key: fs.readFileSync(path.join(__dirname, "../../private.pem")).toString(),
    passphrase,
};

export const publicKey: TPublicKey = fs.readFileSync(path.join(__dirname, "../../public.pem")).toString();

