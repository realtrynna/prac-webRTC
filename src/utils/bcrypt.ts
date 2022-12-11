import bcrypt from "bcrypt";

import { hashSaltRound} from "../config/index";

export async function generateHashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(Number(hashSaltRound));
    const hashPassword = await bcrypt.hash(password, salt);

    return hashPassword;
}

export async function compareHashPassword(password: string, hashPassword: string): Promise<boolean> {
    const comparePassword = await bcrypt.compare(password, hashPassword);

    if (comparePassword) return true;
    else return false; 
}

