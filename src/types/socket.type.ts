export type TPeerRoomTitle = string;

export interface IOffer {
    offer: string;
    roomTitle: string;
}

export interface IAnswer {
    answer: string;
    roomTitle: string;
}

export interface IIce {
    candidate: any;
    roomTitle: string;
}

export interface IChat {
    message: string;
    roomTitle: string;
    nickname: string;
}