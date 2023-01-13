export interface ISignup {
    email: string;
    nickname: string;
    password: string;
}

export interface ISignin extends Omit<ISignup, "nickname"> {}

export interface ITokenPayload extends Pick<ISignup, "nickname"> {
    userId: number;
}

export interface ITokenVerify {
    userId: number;
    nickname: string;
    iat: number;
    exp: number;
    iss: string;
}

export interface IPrivateKey {
    key: string;
    passphrase: string;
}

export type TPublicKey = string;
