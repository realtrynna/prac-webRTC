export interface ISignUp {
    nickname: string;
    password: string;
};

export interface ITokenPayload extends Pick<ISignUp, "nickname"> {};
export interface ITokenVerify {
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


